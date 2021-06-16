import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaciondesalasRegistradoComponent } from './programaciondesalas-registrado.component';

describe('ProgramaciondesalasRegistradoComponent', () => {
  let component: ProgramaciondesalasRegistradoComponent;
  let fixture: ComponentFixture<ProgramaciondesalasRegistradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaciondesalasRegistradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaciondesalasRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
