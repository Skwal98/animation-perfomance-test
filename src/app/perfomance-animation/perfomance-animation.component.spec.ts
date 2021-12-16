import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceAnimationComponent } from './perfomance-animation.component';

describe('PerfomanceAnimationComponent', () => {
  let component: PerfomanceAnimationComponent;
  let fixture: ComponentFixture<PerfomanceAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfomanceAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfomanceAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
