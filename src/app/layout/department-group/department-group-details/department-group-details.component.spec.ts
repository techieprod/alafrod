import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGroupDetailsComponent } from './department-group-details.component';

describe('DepartmentGroupDetailsComponent', () => {
  let component: DepartmentGroupDetailsComponent;
  let fixture: ComponentFixture<DepartmentGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
