import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDictionaryComponent } from './about-dictionary.component';

describe('AboutDictionaryComponent', () => {
  let component: AboutDictionaryComponent;
  let fixture: ComponentFixture<AboutDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
