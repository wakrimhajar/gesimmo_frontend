import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocPhyComponent } from './create-loc-phy.component';

describe('CreateLocPhyComponent', () => {
  let component: CreateLocPhyComponent;
  let fixture: ComponentFixture<CreateLocPhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLocPhyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocPhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
