import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasecretariaModalComponent } from './agendasecretaria-modal.component';

describe('AgendasecretariaModalComponent', () => {
  let component: AgendasecretariaModalComponent;
  let fixture: ComponentFixture<AgendasecretariaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasecretariaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasecretariaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
