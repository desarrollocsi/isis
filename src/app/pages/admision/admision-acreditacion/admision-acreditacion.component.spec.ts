import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionAcreditacionComponent } from './admision-acreditacion.component';

describe('AdmisionAcreditacionComponent', () => {
  let component: AdmisionAcreditacionComponent;
  let fixture: ComponentFixture<AdmisionAcreditacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisionAcreditacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionAcreditacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
