import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDictionaryComponent } from './app-dictionary.component';

describe('AppDictionaryComponent', () => {
  let component: AppDictionaryComponent;
  let fixture: ComponentFixture<AppDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDictionaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
