import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsImmobilierComponent } from './details-immobilier.component';

describe('DetailsImmobilierComponent', () => {
  let component: DetailsImmobilierComponent;
  let fixture: ComponentFixture<DetailsImmobilierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsImmobilierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
