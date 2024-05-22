import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserAccountComponent } from './app-user-account.component';

describe('AppUserAccountComponent', () => {
  let component: AppUserAccountComponent;
  let fixture: ComponentFixture<AppUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUserAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
