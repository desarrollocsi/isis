import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionCoberturasComponent } from './admision-coberturas.component';

describe('AdmisionCoberturasComponent', () => {
  let component: AdmisionCoberturasComponent;
  let fixture: ComponentFixture<AdmisionCoberturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisionCoberturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisionCoberturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
