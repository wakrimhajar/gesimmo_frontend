import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuittanceComponent } from './quittance.component';

describe('QuittanceComponent', () => {
  let component: QuittanceComponent;
  let fixture: ComponentFixture<QuittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuittanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
