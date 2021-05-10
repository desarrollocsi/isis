import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaSearchComponent } from './historia-search.component';

describe('HistoriaSearchComponent', () => {
  let component: HistoriaSearchComponent;
  let fixture: ComponentFixture<HistoriaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
