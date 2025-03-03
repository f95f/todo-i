import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IItem } from './interfaces/item';
import { TodoService } from './services/todo.service';
import { ColorService } from './services/color.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  title = 'TODO';

}
