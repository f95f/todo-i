import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private accentColorSubject = new BehaviorSubject<string>('#FCC22A');
  accentColor$ = this.accentColorSubject.asObservable();

  private colorArray = ['#FCC22A', '#3bb0ff', '#ff3d29', '#17ff79', '#c22eff', '#ffa71c'];

  constructor() {
    this.updateAccentColor();
    setInterval(() => this.updateAccentColor(), 300000);
  }

  private getCurrentHour(): number {
    const now = new Date();
    return now.getHours();
  }

  private updateAccentColor(): void {
    const currentHour = this.getCurrentHour();
    const colorIndex = currentHour % this.colorArray.length;
    const newColor = this.colorArray[colorIndex];
    this.accentColorSubject.next(newColor);
  }
}