import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLocmorComponent } from './details-locmor.component';

describe('DetailsLocmorComponent', () => {
  let component: DetailsLocmorComponent;
  let fixture: ComponentFixture<DetailsLocmorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLocmorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLocmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
