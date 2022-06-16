import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaPagoconsumoComponent } from './caja-pagoconsumo.component';

describe('ReclamosRegistrarComponent', () => {
  let component: CajaPagoconsumoComponent;
  let fixture: ComponentFixture<CajaPagoconsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaPagoconsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaPagoconsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
