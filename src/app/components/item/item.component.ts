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
export class ItemComponent {
  @Input() item!: IItem;
  @Output() onEditItem = new EventEmitter<IItem>();
  @Output() onDeleteItem = new EventEmitter<string>();
  @Output() onToggleItemStatus = new EventEmitter<IItem>();

  updateItem(){
    this.onEditItem.emit(this.item);
  }

  updateCheckedStatus(){
    this.item.isDone = !this.item.isDone;
    this.onToggleItemStatus.emit(this.item);
  }

  deleteItem(){
    this.onDeleteItem.emit(this.item.id);
  }
}
