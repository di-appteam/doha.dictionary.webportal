import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGuideComponent } from './standard-guide.component';

describe('StandardGuideComponent', () => {
  let component: StandardGuideComponent;
  let fixture: ComponentFixture<StandardGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
