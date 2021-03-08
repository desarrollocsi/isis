import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaccionAddEditComponent } from './programaccion-add-edit.component';

describe('ProgramaccionAddEditComponent', () => {
  let component: ProgramaccionAddEditComponent;
  let fixture: ComponentFixture<ProgramaccionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramaccionAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaccionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
