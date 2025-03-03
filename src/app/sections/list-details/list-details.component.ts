import { Component, inject, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from 'src/app/components/input/input.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { IList } from 'src/app/interfaces/ilist';
import { IItem } from 'src/app/interfaces/item';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ColorService } from 'src/app/services/color.service';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list-details',
  imports: [
    InputComponent,
    SharedModule,
    ItemComponent
  ],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent {

  private dataService: DataService = inject(DataService);
  private colorService: ColorService = inject(ColorService);
  private storageService: StorageService = inject(StorageService);
  private router: Router = inject(Router);

  todoList!: IList;
  itemToEdit!: IItem;
  itemToChangeStatus!: IItem;
  
  ngOnInit(): void {
    this.dataService.listId.subscribe((id) => {
      if(!id) { this.return(); return; }

      const todoList = this.storageService.getListDetails(id);
      if (todoList) {
        this.todoList = todoList;
      }
      else {
        this.return();
      }
    });

    this.colorService.accentColor$.subscribe((color) => {
      document.documentElement.style.setProperty('--accent', color);
    });
  }

  createItem(item: IItem) {
    this.todoList.items.push(item);
    this.storageService.storeList(this.todoList);
  }
  
  updateItem(item: IItem) {
    const index = this.todoList.items.findIndex(i => i.id === item.id);
    this.todoList.items[index] = item;
    this.storageService.storeList(this.todoList);
  }



  setITemToEdit(item: IItem) {
    this.itemToEdit = item;
  }

  updateCheckedStatus(item: IItem){
    this.updateItem(item);
  }

  deleteItem(itemId: string) {
    const index = this.todoList.items.findIndex(item => item.id === itemId);
    this.todoList.items.splice(index, 1);
    this.storageService.storeList(this.todoList);
  }

  clearList(){
    this.todoList.items = [];
    this.storageService.storeList(this.todoList);
  }

  return(): void {
    this.router.navigate(['/lists']);
  }
}
