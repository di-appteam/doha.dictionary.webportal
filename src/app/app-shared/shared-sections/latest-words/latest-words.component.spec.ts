import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestWordsComponent } from './latest-words.component';

describe('LatestWordsComponent', () => {
  let component: LatestWordsComponent;
  let fixture: ComponentFixture<LatestWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
