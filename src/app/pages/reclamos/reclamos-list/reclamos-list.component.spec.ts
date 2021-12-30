import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosListComponent } from './reclamos-list.component';

describe('ReclamosListComponent', () => {
  let component: ReclamosListComponent;
  let fixture: ComponentFixture<ReclamosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
