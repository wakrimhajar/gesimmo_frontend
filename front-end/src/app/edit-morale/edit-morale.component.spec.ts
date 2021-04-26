import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoraleComponent } from './edit-morale.component';

describe('EditMoraleComponent', () => {
  let component: EditMoraleComponent;
  let fixture: ComponentFixture<EditMoraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMoraleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
