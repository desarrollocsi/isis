import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasecretariaComponent } from './agendasecretaria.component';

describe('AgendasecretariaComponent', () => {
  let component: AgendasecretariaComponent;
  let fixture: ComponentFixture<AgendasecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
