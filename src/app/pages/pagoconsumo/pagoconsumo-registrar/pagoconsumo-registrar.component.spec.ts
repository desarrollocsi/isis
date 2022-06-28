import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConsumoRegistrarComponent } from './pagoconsumo-registrar.component';

describe('ReclamosRegistrarComponent', () => {
  let component: PagoConsumoRegistrarComponent;
  let fixture: ComponentFixture<PagoConsumoRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoConsumoRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConsumoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
