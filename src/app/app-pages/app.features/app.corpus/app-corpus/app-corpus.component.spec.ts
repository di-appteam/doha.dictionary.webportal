import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCorpusComponent } from './app-corpus.component';

describe('AppCorpusComponent', () => {
  let component: AppCorpusComponent;
  let fixture: ComponentFixture<AppCorpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCorpusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
