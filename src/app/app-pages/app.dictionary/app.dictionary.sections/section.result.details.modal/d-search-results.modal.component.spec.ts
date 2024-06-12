import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DResultmodalComponent } from './d-search-results.modal.component';

describe('DResultmodalComponent', () => {
  let component: DResultmodalComponent;
  let fixture: ComponentFixture<DResultmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DResultmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DResultmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
