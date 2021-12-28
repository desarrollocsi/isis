import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosTramaComponent } from './reclamos-trama.component';

describe('ReclamosTramaComponent', () => {
  let component: ReclamosTramaComponent;
  let fixture: ComponentFixture<ReclamosTramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosTramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosTramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
