import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiapoComponent } from './diapo.component';

describe('DiapoComponent', () => {
  let component: DiapoComponent;
  let fixture: ComponentFixture<DiapoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiapoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiapoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
