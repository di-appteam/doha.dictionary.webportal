import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DSearchResultsDetailComponent } from './d-search-results.detail.component';

describe('DSearchResultsDetailComponent', () => {
  let component: DSearchResultsDetailComponent;
  let fixture: ComponentFixture<DSearchResultsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DSearchResultsDetailComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(DSearchResultsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
