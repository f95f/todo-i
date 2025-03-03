import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private $listId = new BehaviorSubject<string>('');

    get listId(): Observable<string> {
        return this.$listId.asObservable();
    }

    setListId(id: string): void {
      this.$listId.next(id);
    }
}
