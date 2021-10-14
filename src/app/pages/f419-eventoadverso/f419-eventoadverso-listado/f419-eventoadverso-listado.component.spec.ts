import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F419EventoadversoListadoComponent } from './f419-eventoadverso-listado.component';

describe('F419EventoadversoListadoComponent', () => {
  let component: F419EventoadversoListadoComponent;
  let fixture: ComponentFixture<F419EventoadversoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F419EventoadversoListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F419EventoadversoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
