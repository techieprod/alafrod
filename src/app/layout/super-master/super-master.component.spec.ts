import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMasterComponent } from './super-master.component';

describe('SuperMasterComponent', () => {
  let component: SuperMasterComponent;
  let fixture: ComponentFixture<SuperMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
