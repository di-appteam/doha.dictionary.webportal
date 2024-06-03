import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DSearchResultsComponent } from './d-search-results.component';

describe('DSearchResultsComponent', () => {
  let component: DSearchResultsComponent;
  let fixture: ComponentFixture<DSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
