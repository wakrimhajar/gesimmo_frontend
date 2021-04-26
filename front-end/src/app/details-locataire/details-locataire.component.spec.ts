import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLocataireComponent } from './details-locataire.component';

describe('DetailsLocataireComponent', () => {
  let component: DetailsLocataireComponent;
  let fixture: ComponentFixture<DetailsLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLocataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
