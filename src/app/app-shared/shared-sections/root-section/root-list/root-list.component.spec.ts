import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootListComponent } from './root-list.component';

describe('RootListComponent', () => {
  let component: RootListComponent;
  let fixture: ComponentFixture<RootListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
