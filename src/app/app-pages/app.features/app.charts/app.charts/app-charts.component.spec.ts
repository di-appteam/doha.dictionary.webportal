import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartsComponent } from './app-charts.component';

describe('AppChartsComponent', () => {
  let component: AppChartsComponent;
  let fixture: ComponentFixture<AppChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
