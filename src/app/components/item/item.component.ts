import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IItem } from 'src/app/interfaces/item';
import { IconModule } from 'src/app/modules/icon/icon.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
    imports: [
      SharedModule,
      IconModule
    ]
})
export class ItemComponent implements OnInit, OnChanges {
  @Input() item!: IItem;
  @Output() itemToEmit = new EventEmitter<IItem>();
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
