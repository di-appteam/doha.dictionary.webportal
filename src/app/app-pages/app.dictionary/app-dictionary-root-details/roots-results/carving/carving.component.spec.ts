import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarvingComponent } from './carving.component';

describe('CarvingComponent', () => {
  let component: CarvingComponent;
  let fixture: ComponentFixture<CarvingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarvingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
