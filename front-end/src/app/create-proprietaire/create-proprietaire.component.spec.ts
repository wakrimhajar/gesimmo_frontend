import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProprietaireComponent } from './create-proprietaire.component';

describe('CreateProprietaireComponent', () => {
  let component: CreateProprietaireComponent;
  let fixture: ComponentFixture<CreateProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProprietaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
