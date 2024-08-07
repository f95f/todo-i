import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PencilComponent } from './pencil.component';

describe('PencilComponent', () => {
  let component: PencilComponent;
  let fixture: ComponentFixture<PencilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PencilComponent]
    });
    fixture = TestBed.createComponent(PencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
