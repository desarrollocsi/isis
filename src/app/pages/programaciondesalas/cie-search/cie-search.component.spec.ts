import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CieSearchComponent } from './cie-search.component';

describe('CieSearchComponent', () => {
  let component: CieSearchComponent;
  let fixture: ComponentFixture<CieSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CieSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
