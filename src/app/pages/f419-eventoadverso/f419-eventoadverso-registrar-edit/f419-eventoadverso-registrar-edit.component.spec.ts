import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F419EventoadversoRegistrarEditComponent } from './f419-eventoadverso-registrar-edit.component';

describe('F419EventoadversoRegistrarEditComponent', () => {
  let component: F419EventoadversoRegistrarEditComponent;
  let fixture: ComponentFixture<F419EventoadversoRegistrarEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F419EventoadversoRegistrarEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F419EventoadversoRegistrarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
