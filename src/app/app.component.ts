import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from './interfaces/item';
import { TodoService } from './services/todo.service';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, DoCheck{

  title = 'TODO';
  todoList!: Array<Item>;
  itemToEdit!: Item;
  itemToChangeStatus!: Item;

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
  
  updateItem(item: Item) {
    this.itemToEdit = item;
  }
  updateCheckedStatus(item: Item){
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
