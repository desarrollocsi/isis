import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaRegistrarComponent } from './historia-registrar.component';

describe('HistoriaRegistrarComponent', () => {
  let component: HistoriaRegistrarComponent;
  let fixture: ComponentFixture<HistoriaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
