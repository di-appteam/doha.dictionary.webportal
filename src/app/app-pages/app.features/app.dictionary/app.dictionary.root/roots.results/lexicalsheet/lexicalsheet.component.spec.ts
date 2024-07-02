import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LexicalsheetComponent } from './lexicalsheet.component';

describe('LexicalsheetComponent', () => {
  let component: LexicalsheetComponent;
  let fixture: ComponentFixture<LexicalsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LexicalsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexicalsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
