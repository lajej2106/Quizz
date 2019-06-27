import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForStartComponent } from './wait-for-start.component';

describe('WaitForStartComponent', () => {
  let component: WaitForStartComponent;
  let fixture: ComponentFixture<WaitForStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
