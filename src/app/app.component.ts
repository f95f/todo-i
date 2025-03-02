import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IItem } from './interfaces/item';
import { TodoService } from './services/todo.service';
import { ColorService } from './services/color.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit, OnChanges, DoCheck{

  title = 'TODO';
  todoList!: Array<IItem>;
  itemToEdit!: IItem;
  itemToChangeStatus!: IItem;

  constructor(private service: TodoService,
              private colorService: ColorService  ){}

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
