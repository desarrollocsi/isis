import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdinamicoModalComponent } from './formdinamico-modal.component';

describe('FormdinamicoModalComponent', () => {
  let component: FormdinamicoModalComponent;
  let fixture: ComponentFixture<FormdinamicoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdinamicoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdinamicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
