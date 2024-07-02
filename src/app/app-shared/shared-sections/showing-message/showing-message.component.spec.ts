import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingMessageComponent } from './showing-message.component';

describe('ShowingMessageComponent', () => {
  let component: ShowingMessageComponent;
  let fixture: ComponentFixture<ShowingMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
