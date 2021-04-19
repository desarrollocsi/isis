import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionModalComponent } from './programacion-modal.component';

describe('ProgramacionModalComponent', () => {
  let component: ProgramacionModalComponent;
  let fixture: ComponentFixture<ProgramacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
