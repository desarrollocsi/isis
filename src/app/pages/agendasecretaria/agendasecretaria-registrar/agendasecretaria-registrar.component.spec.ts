import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasecretariaRegistrarComponent } from './agendasecretaria-registrar.component';

describe('AgendasecretariaRegistrarComponent', () => {
  let component: AgendasecretariaRegistrarComponent;
  let fixture: ComponentFixture<AgendasecretariaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasecretariaRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasecretariaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
