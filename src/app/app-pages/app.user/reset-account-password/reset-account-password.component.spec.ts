import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAccountPasswordComponent } from './reset-account-password.component';

describe('ResetAccountPasswordComponent', () => {
  let component: ResetAccountPasswordComponent;
  let fixture: ComponentFixture<ResetAccountPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetAccountPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetAccountPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
