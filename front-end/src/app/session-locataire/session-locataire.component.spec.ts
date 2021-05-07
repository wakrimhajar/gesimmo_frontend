import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLocataireComponent } from './session-locataire.component';

describe('SessionLocataireComponent', () => {
  let component: SessionLocataireComponent;
  let fixture: ComponentFixture<SessionLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionLocataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
