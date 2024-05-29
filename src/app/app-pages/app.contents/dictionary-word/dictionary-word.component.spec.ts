import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryWordComponent } from './dictionary-word.component';

describe('DictionaryWordComponent', () => {
  let component: DictionaryWordComponent;
  let fixture: ComponentFixture<DictionaryWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
