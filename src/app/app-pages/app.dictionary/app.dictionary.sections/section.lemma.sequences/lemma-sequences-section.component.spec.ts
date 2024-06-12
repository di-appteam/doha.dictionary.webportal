import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LemmaSequencesSectionComponent } from './lemma-sequences-section.component';

describe('LemmaSequencesSectionComponent', () => {
  let component: LemmaSequencesSectionComponent;
  let fixture: ComponentFixture<LemmaSequencesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmaSequencesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmaSequencesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
