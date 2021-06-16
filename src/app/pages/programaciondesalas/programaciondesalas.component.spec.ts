import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasComponent } from './programaciondesalas.component';

describe('ProgramaciondesalasComponent', () => {
  let component: ProgramaciondesalasComponent;
  let fixture: ComponentFixture<ProgramaciondesalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
