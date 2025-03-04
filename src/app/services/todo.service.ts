import { Injectable } from '@angular/core';
import { IItem } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: IItem[] = []

  constructor() {
    console.log('Instanciando dependências necessárias para o serviço.');
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  getTodoList(){
    return this.todoList;
  }

  createItem(item: string): any{
    const id = this.todoList.length +1;
    const newItem: IItem = {
      id: '',
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

  editItem(previousItem: IItem, updatedItem: string){
    const item: IItem = {
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
