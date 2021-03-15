import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplyingTdkPrintComponent } from './user-applying-tdk-print.component';

describe('UserApplyingTdkPrintComponent', () => {
  let component: UserApplyingTdkPrintComponent;
  let fixture: ComponentFixture<UserApplyingTdkPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApplyingTdkPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplyingTdkPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
