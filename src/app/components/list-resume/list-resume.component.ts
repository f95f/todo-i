import { Component, inject, Input } from '@angular/core';
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

  private router: Router = inject(Router);
  private dataService: DataService = inject(DataService);

  selectList(listId: string): void {
    this.dataService.setListId(listId);
    this.router.navigate([`/lists/todos`]);
  }

}
