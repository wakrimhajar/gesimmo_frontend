import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionProprietaireComponent } from './session-proprietaire.component';

describe('SessionProprietaireComponent', () => {
  let component: SessionProprietaireComponent;
  let fixture: ComponentFixture<SessionProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
