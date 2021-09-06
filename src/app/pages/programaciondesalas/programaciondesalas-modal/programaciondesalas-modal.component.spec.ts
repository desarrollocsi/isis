import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasModalComponent } from './programaciondesalas-modal.component';

describe('ProgramaciondesalasModalComponent', () => {
  let component: ProgramaciondesalasModalComponent;
  let fixture: ComponentFixture<ProgramaciondesalasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
