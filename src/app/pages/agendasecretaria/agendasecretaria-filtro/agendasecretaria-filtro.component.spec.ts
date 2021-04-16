import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasecretariaFiltroComponent } from './agendasecretaria-filtro.component';

describe('AgendasecretariaFiltroComponent', () => {
  let component: AgendasecretariaFiltroComponent;
  let fixture: ComponentFixture<AgendasecretariaFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasecretariaFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasecretariaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
