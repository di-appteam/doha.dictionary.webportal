import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSectionComponent } from './root-section.component';

describe('RootSectionComponent', () => {
  let component: RootSectionComponent;
  let fixture: ComponentFixture<RootSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
