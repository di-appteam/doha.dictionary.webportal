import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtymologicalForLemmaComponent } from './etymological-for-lemma.component';

describe('EtymologicalForLemmaComponent', () => {
  let component: EtymologicalForLemmaComponent;
  let fixture: ComponentFixture<EtymologicalForLemmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtymologicalForLemmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtymologicalForLemmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
