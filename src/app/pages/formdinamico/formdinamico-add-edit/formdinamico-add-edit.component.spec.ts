import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdinamicoAddEditComponent } from './formdinamico-add-edit.component';

describe('FormdinamicoAddEditComponent', () => {
  let component: FormdinamicoAddEditComponent;
  let fixture: ComponentFixture<FormdinamicoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdinamicoAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdinamicoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
