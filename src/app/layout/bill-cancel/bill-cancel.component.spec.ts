import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCancelComponent } from './bill-cancel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('BillCancelComponent', () => {
  let component: BillCancelComponent;
  let fixture: ComponentFixture<BillCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCancelComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
