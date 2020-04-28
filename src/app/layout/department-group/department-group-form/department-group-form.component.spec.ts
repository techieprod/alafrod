import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGroupFormComponent } from './department-group-form.component';

describe('DepartmentGroupFormComponent', () => {
  let component: DepartmentGroupFormComponent;
  let fixture: ComponentFixture<DepartmentGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
