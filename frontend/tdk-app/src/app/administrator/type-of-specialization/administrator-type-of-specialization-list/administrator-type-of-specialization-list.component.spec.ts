import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorTypeOfSpecializationListComponent } from './administrator-type-of-specialization-list.component';

describe('AdministratorTypeOfSpecializationListComponent', () => {
  let component: AdministratorTypeOfSpecializationListComponent;
  let fixture: ComponentFixture<AdministratorTypeOfSpecializationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorTypeOfSpecializationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorTypeOfSpecializationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
