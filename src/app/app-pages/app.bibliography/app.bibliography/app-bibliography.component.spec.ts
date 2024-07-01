import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBibliographyComponent } from './app-bibliography.component';

describe('AppBibliographyComponent', () => {
  let component: AppBibliographyComponent;
  let fixture: ComponentFixture<AppBibliographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBibliographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppBibliographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
