import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisePaiementComponent } from './remise-paiement.component';

describe('RemisePaiementComponent', () => {
  let component: RemisePaiementComponent;
  let fixture: ComponentFixture<RemisePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemisePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemisePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
