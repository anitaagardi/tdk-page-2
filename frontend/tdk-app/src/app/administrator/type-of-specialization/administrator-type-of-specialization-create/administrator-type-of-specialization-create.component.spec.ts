import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorTypeOfSpecializationCreateComponent } from './administrator-type-of-specialization-create.component';

describe('AdministratorTypeOfSpecializationCreateComponent', () => {
  let component: AdministratorTypeOfSpecializationCreateComponent;
  let fixture: ComponentFixture<AdministratorTypeOfSpecializationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorTypeOfSpecializationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorTypeOfSpecializationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
