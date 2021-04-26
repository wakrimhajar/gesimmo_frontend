import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocmorComponent } from './edit-locmor.component';

describe('EditLocmorComponent', () => {
  let component: EditLocmorComponent;
  let fixture: ComponentFixture<EditLocmorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocmorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
