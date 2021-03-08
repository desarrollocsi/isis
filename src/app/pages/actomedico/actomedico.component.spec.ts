import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActomedicoComponent } from './actomedico.component';

describe('ActomedicoComponent', () => {
  let component: ActomedicoComponent;
  let fixture: ComponentFixture<ActomedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActomedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActomedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
