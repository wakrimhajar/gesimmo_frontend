import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBienComponent } from './details-bien.component';

describe('DetailsBienComponent', () => {
  let component: DetailsBienComponent;
  let fixture: ComponentFixture<DetailsBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
