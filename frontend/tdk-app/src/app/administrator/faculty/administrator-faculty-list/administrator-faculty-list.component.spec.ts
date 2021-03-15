import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFacultyListComponent } from './administrator-faculty-list.component';

describe('AdministratorFacultyListComponent', () => {
  let component: AdministratorFacultyListComponent;
  let fixture: ComponentFixture<AdministratorFacultyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorFacultyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFacultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
