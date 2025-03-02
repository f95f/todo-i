import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/item';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
    standalone: false
})
export class ItemComponent implements OnInit, OnChanges {
  @Input() item!: Item;
  @Output() itemToEmit = new EventEmitter<Item>();
  @Output() itemToDelete = new EventEmitter<number>();
  
  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges): void { }

  updateItem(){
    this.itemToEmit.emit(this.item);
  }
  updateCheckedStatus(){
    this.item.isDone = !this.item.isDone;
  }
  deleteItem(){
    this.itemToDelete.emit(Number(this.item.id));
  }
}
