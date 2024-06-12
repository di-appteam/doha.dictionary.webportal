import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestWordsSectionComponent } from './latest-words-section.component';

describe('LatestWordsSectionComponent', () => {
  let component: LatestWordsSectionComponent;
  let fixture: ComponentFixture<LatestWordsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestWordsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestWordsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
