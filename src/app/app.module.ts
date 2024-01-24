import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { TrashComponent } from './icons/trash/trash.component';
import { PencilComponent } from './icons/pencil/pencil.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    InputComponent,
    TrashComponent,
    PencilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
