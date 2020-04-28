import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTableComponent } from './pos-table.component';

describe('PosTableComponent', () => {
  let component: PosTableComponent;
  let fixture: ComponentFixture<PosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
