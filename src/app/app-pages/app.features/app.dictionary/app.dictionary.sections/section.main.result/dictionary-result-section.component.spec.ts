import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryResultSectionComponent } from './dictionary-result-section.component';

describe('DictionaryResultSectionComponent', () => {
  let component: DictionaryResultSectionComponent;
  let fixture: ComponentFixture<DictionaryResultSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryResultSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryResultSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
