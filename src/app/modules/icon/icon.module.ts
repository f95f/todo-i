import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PencilComponent } from 'src/assets/icons/pencil/pencil.component';
import { TrashComponent } from 'src/assets/icons/trash/trash.component';



@NgModule({
  declarations: [
    TrashComponent,
    PencilComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconModule { }
