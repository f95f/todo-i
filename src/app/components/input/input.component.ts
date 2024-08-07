import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnChanges {

  @Input() itemToEdit!: Item; 
  itemValue!: string;
  isEditing: boolean = false;
  buttonText: string = '+ Adicionar';

  constructor(private service: TodoService){}

  addItem(){
    this.service.addItemToList(this.itemValue);
    this.clearInput(); 
  }
  updateItem(){
   this.service.editItem(this.itemToEdit, this.itemValue);
   this.clearInput();
   this.isEditing = false;
   this.buttonText = "Adicionar";
  }
  clearInput(){
    this.itemValue = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    // console.info(changes['itemToEdit'].currentValue);
    if(!changes['itemToEdit'].firstChange){
      this.isEditing = true;
      this.buttonText = 'Salvar';
      this.itemValue = this.itemToEdit.name;
    }
  }
}
