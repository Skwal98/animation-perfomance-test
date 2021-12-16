import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlugComponent } from './test-plug.component';

describe('TestPlugComponent', () => {
  let component: TestPlugComponent;
  let fixture: ComponentFixture<TestPlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPlugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
