import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSearchedComponent } from './most-searched.component';

describe('MostSearchedComponent', () => {
  let component: MostSearchedComponent;
  let fixture: ComponentFixture<MostSearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
