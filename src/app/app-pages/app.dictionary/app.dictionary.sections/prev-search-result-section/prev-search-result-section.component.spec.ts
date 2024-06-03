import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevSearchResultSectionComponent } from './prev-search-result-section.component';

describe('PrevSearchResultSectionComponent', () => {
  let component: PrevSearchResultSectionComponent;
  let fixture: ComponentFixture<PrevSearchResultSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevSearchResultSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevSearchResultSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
