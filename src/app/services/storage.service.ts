import { Injectable } from '@angular/core';
import { IList, IListResume } from '../interfaces/ilist';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private lists: IList[] = [];
  private listResumes: IListResume[] = [];
  private listsKey: string = 'lists';
  private listResumesKey: string = 'listResumes';

  getLists(): IListResume[] {
    this.retrieveLists();
    this.checkForEmptyLists();
    return this.listResumes;
  }

  storeList(list: IList): void {
    const listIndex: number = this.lists.findIndex((l: IList) => l.id === list.id);
    listIndex === -1 ? this.lists.push(list) : this.lists[listIndex] = list;
    this.updateListResume();
    this.storeInClientStorage(this.listsKey, this.lists);
  }


  getListDetails(listId: string): IList | null {
    const list: IList | undefined = this.lists.find((list: IList) => list.id === listId);
    if (!list) {
      console.error(`List with id ${listId} not found.`);
      return null;
    }
    return list;
  }


  deleteList(listId: string): void {
    const listIndex: number = this.lists.findIndex((list: IList) => list.id === listId);
    if (listIndex === -1) {
      console.error(`List with id ${listId} not found.`);
      return;
    }
    this.lists.splice(listIndex, 1);
    this.updateListResume();
    this.storeInClientStorage(this.listsKey, this.lists);
  }



  private updateListResume(): void {
    this.listResumes = this.lists.map((list: IList) => {
      return {
        id: list.id,
        name: list.name,
        createdAt: list.createdAt,
        size: list.items.length,
        completion: list.items.filter((item) => item.isDone).length
      };
    });
    this.storeInClientStorage(this.listResumesKey, this.listResumes);
  }

  
  private retrieveLists(): void {
    this.lists = (this.retrieveFromClientStorage(this.listsKey) || []) as IList[];
    this.listResumes = (this.retrieveFromClientStorage(this.listResumesKey) || []) as IListResume[];
  }


  private retrieveFromClientStorage(key: string): unknown { 
    const item = localStorage.getItem(key);

    if (!item) {
      console.error(`Item ${key} not found in local storage`);
      return null;
    }

    try {
      return JSON.parse(item);
    }
    catch (error) {
      console.error(`Error parsing item ${key} from local storage: `, error);
      return null;
    }
  }


  private storeInClientStorage(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      console.error(`Error storing item ${key} in local storage: `, error);
    }
  }

  private checkForEmptyLists(): void {
    if(!this.lists || this.lists.length === 0) return;
    this.lists.forEach((list: IList) => {
      if(list.items.length === 0) {
        this.deleteList(list.id);
      }
    });
  }
}
