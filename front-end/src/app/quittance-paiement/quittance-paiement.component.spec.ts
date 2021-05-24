import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuittancePaiementComponent } from './quittance-paiement.component';

describe('QuittancePaiementComponent', () => {
  let component: QuittancePaiementComponent;
  let fixture: ComponentFixture<QuittancePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuittancePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuittancePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
