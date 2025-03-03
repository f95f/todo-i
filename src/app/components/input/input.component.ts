import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IItem } from 'src/app/interfaces/item';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    imports: [
      SharedModule
    ] 
})
export class InputComponent {

  @Input() itemToEdit!: IItem; 
  @Output() onCreateItem = new EventEmitter<IItem>();
  @Output() onEditItem = new EventEmitter<IItem>();
  
  itemValue!: string;
  isEditing: boolean = false;
  buttonText: string = '+ Adicionar';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemToEdit'] && changes['itemToEdit'].currentValue) {
      this.isEditing = true;
      this.buttonText = "Confirmar";
      this.itemValue = this.itemToEdit.name;
    }
  }

  addItem(){
    const item: IItem = {
      id: uuidv4(),
      name: this.itemValue,
      date: new Date(),
      isDone: false
    }
    this.onCreateItem.emit(item);
    this.clearInput(); 
  }
  
  updateItem(){
    const item: IItem = {
      id: this.itemToEdit.id,
      name: this.itemValue,
      date: this.itemToEdit.date,
      isDone: this.itemToEdit.isDone
    }
    this.onEditItem.emit(item);
    this.clearInput();
    this.isEditing = false;
    this.buttonText = "Adicionar";
  }

  clearInput(){
    this.itemValue = '';
  }
}
