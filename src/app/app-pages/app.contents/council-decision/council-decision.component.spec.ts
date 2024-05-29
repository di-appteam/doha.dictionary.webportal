import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDecisionComponent } from './council-decision.component';

describe('CouncilDecisionComponent', () => {
  let component: CouncilDecisionComponent;
  let fixture: ComponentFixture<CouncilDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
