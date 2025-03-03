import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { PencilComponent } from 'src/assets/icons/pencil/pencil.component';
import { TrashComponent } from 'src/assets/icons/trash/trash.component';
import { IconModule } from './modules/icon/icon.module';
import { ListDetailsComponent } from './sections/list-details/list-details.component';
import { ListsComponent } from './sections/lists/lists.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // IconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
