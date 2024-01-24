import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: Item[] = []

  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  getTodoList(){
    return this.todoList;
  }

  createItem(item: string): Item{
    const id = this.todoList.length +1;
    const newItem: Item = {
      id: id,
      name: item,
      date: this.makeDate(),
      isDone: false,
    }
    return newItem;
  }
  makeDate(): string{
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const currentDate = new Date();
    return `${currentDate.getDate()} de ${months[currentDate.getMonth()]}`;
  }
  addItemToList(itemName: string){
    const item = this.createItem(itemName);
    this.todoList.push(item);
  }

  editItem(previousItem: Item, updatedItem: string){
    const item: Item = {
      id: previousItem.id,
      name: updatedItem,
      date: previousItem.date,
      isDone: previousItem.isDone
    }
    const id = previousItem.id;
    this.todoList.splice(Number(id) -1, 1, item);
  }
  clearList() {
    this.todoList = []; 
    this.storeItems(); 
  }
  storeItems(){
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
