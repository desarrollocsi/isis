import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosRegistrarComponent } from './reclamos-registrar.component';

describe('ReclamosRegistrarComponent', () => {
  let component: ReclamosRegistrarComponent;
  let fixture: ComponentFixture<ReclamosRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamosRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
