import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './sections/lists/lists.component';
import { ListDetailsComponent } from './sections/list-details/list-details.component';

const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'lists/todos', component: ListDetailsComponent },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: '**', redirectTo: '/lists' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
