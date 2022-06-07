import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionLayaoutComponent } from './admision-layaout.component';

describe('AdmisionLayaoutComponent', () => {
  let component: AdmisionLayaoutComponent;
  let fixture: ComponentFixture<AdmisionLayaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisionLayaoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionLayaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
