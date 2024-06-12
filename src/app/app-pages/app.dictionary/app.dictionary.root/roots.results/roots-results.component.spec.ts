import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootsResultsComponent } from './roots-results.component';

describe('RootsResultsComponent', () => {
  let component: RootsResultsComponent;
  let fixture: ComponentFixture<RootsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
