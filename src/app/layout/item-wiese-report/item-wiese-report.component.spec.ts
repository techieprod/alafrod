import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWieseReportComponent } from './item-wiese-report.component';

describe('ItemWieseReportComponent', () => {
  let component: ItemWieseReportComponent;
  let fixture: ComponentFixture<ItemWieseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWieseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWieseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
