import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F419EventoadversoComponent } from './f419-eventoadverso.component';

describe('F419EventoadversoComponent', () => {
  let component: F419EventoadversoComponent;
  let fixture: ComponentFixture<F419EventoadversoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F419EventoadversoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F419EventoadversoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
