import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocMorComponent } from './create-loc-mor.component';

describe('CreateLocMorComponent', () => {
  let component: CreateLocMorComponent;
  let fixture: ComponentFixture<CreateLocMorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLocMorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocMorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
