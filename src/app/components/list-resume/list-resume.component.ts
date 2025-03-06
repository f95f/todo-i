import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IListResume } from 'src/app/interfaces/ilist';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-resume',
  imports: [ SharedModule ],
  templateUrl: './list-resume.component.html',
  styleUrl: './list-resume.component.css'
})
export class ListResumeComponent {
  @Input() list!: IListResume;
  @Output() onDelete = new EventEmitter<string>();

  private router: Router = inject(Router);
  private dataService: DataService = inject(DataService);

  selectList(listId: string): void {
    this.dataService.setListId(listId);
    this.router.navigate([`/lists/todos`]);
  }

  getWidth(): string {
    const completion = this.list.completion || 0;
    const totalItems = this.list.size || 0;

    return totalItems? `${((completion / totalItems) * 100).toFixed()}%` : `0%`;
  }

  deleteList(listId: string): void {4
    this.onDelete.emit(listId);
  }
}
