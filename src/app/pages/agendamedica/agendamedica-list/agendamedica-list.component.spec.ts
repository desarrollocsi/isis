import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamedicaListComponent } from './agendamedica-list.component';

describe('AgendamedicaListComponent', () => {
  let component: AgendamedicaListComponent;
  let fixture: ComponentFixture<AgendamedicaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamedicaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamedicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
