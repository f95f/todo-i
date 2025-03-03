import { Component, inject, SimpleChanges } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { IItem } from 'src/app/interfaces/item';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ColorService } from 'src/app/services/color.service';
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

  private service: TodoService = inject(TodoService);
  private colorService: ColorService = inject(ColorService);

  todoList!: Array<IItem>;
  itemToEdit!: IItem;
  itemToChangeStatus!: IItem;

  ngDoCheck(): void {
    this.service.storeItems();
  }
  
  ngOnInit(): void {
    this.todoList = this.service.getTodoList();
    
    this.colorService.accentColor$.subscribe((color) => {
      document.documentElement.style.setProperty('--accent', color);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  updateItem(item: IItem) {
    this.itemToEdit = item;
  }
  updateCheckedStatus(item: IItem){
    this.itemToChangeStatus = item;
    this.itemToChangeStatus.isDone = !this.itemToChangeStatus.isDone;
  }

  deleteItem(itemId: number) {
    const index = this.todoList.findIndex(item => item.id === itemId);
    this.todoList.splice(index, 1);
  }
  clearList(){
    this.service.clearList();
    this.todoList = this.service.getTodoList();
  }
}
