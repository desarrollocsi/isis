import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConsumoModalComponent } from './pagoconsumo-modal.component';

describe('PagoConsumoModalComponent', () => {
  let component: PagoConsumoModalComponent;
  let fixture: ComponentFixture<PagoConsumoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoConsumoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConsumoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
