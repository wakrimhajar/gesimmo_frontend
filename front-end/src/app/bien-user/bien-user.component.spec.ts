import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienUserComponent } from './bien-user.component';

describe('BienUserComponent', () => {
  let component: BienUserComponent;
  let fixture: ComponentFixture<BienUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
