import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdinamicoListComponent } from './formdinamico-list.component';

describe('FormdinamicoListComponent', () => {
  let component: FormdinamicoListComponent;
  let fixture: ComponentFixture<FormdinamicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdinamicoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdinamicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
