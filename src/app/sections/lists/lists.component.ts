import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListResumeComponent } from 'src/app/components/list-resume/list-resume.component';
import { IList, IListResume } from 'src/app/interfaces/ilist';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-lists',
  imports: [
    ListResumeComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {
  private service: StorageService = inject(StorageService);
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  
  todoLists: IListResume[] = [];

  ngOnInit(): void {
    this.getLists();
  }
  
  
  getLists() {
    this.todoLists = this.service.getLists();
  }

  createEmptyList() {
    const emptyList: IList = {
      id: uuidv4(),
      name: `todo #${this.todoLists.length + 1}`,
      items: [],
      createdAt: new Date(),
      updatedAt: '',
      size: 0,
      completion: 0
    }
    this.service.storeList(emptyList);
    this.dataService.setListId(emptyList.id);
    this.router.navigate([`/lists/todos`]);
  }

  openList(listId: string) {
    this.dataService.setListId(listId);
    this.router.navigate([`/lists/todos`]);
  }

  deleteList(listId: string) {
    this.service.deleteList(listId);
    this.getLists();
  }
}
