import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartsSearchComponent } from './app-charts-search.component';

describe('AppChartsSearchComponent', () => {
  let component: AppChartsSearchComponent;
  let fixture: ComponentFixture<AppChartsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChartsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChartsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
