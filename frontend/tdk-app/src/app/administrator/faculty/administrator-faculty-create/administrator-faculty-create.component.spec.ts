import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFacultyCreateComponent } from './administrator-faculty-create.component';

describe('AdministratorFacultyCreateComponent', () => {
  let component: AdministratorFacultyCreateComponent;
  let fixture: ComponentFixture<AdministratorFacultyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorFacultyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFacultyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
