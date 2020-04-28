import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGroupListComponent } from './department-group-list.component';

describe('DepartmentGroupListComponent', () => {
  let component: DepartmentGroupListComponent;
  let fixture: ComponentFixture<DepartmentGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
