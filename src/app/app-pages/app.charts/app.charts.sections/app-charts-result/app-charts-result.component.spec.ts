import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartsResultComponent } from './app-charts-result.component';

describe('AppChartsResultComponent', () => {
  let component: AppChartsResultComponent;
  let fixture: ComponentFixture<AppChartsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChartsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChartsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
