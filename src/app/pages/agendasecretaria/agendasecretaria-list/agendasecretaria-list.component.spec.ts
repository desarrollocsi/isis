import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasecretariaListComponent } from './agendasecretaria-list.component';

describe('AgendasecretariaListComponent', () => {
  let component: AgendasecretariaListComponent;
  let fixture: ComponentFixture<AgendasecretariaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasecretariaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasecretariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
