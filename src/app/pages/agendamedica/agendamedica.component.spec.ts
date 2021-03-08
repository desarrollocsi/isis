import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamedicaComponent } from './agendamedica.component';

describe('AgendamedicaComponent', () => {
  let component: AgendamedicaComponent;
  let fixture: ComponentFixture<AgendamedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
