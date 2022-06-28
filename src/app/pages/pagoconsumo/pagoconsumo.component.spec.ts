import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConsumoComponent } from './pagoconsumo.component';

describe('PagoConsumoComponent', () => {
  let component: PagoConsumoComponent;
  let fixture: ComponentFixture<PagoConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoConsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
