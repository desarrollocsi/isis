import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdinamicoComponent } from './formdinamico.component';

describe('FormdinamicoComponent', () => {
  let component: FormdinamicoComponent;
  let fixture: ComponentFixture<FormdinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdinamicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
