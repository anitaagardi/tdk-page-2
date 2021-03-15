import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationsListComponent } from './user-applications-list.component';

describe('UserApplicationsListComponent', () => {
  let component: UserApplicationsListComponent;
  let fixture: ComponentFixture<UserApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApplicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
