import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtymologicalComponent } from './etymological.component';

describe('EtymologicalComponent', () => {
  let component: EtymologicalComponent;
  let fixture: ComponentFixture<EtymologicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtymologicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtymologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
