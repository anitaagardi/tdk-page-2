import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSpecializationCreateComponent } from './administrator-specialization-create.component';

describe('AdministratorSpecializationCreateComponent', () => {
  let component: AdministratorSpecializationCreateComponent;
  let fixture: ComponentFixture<AdministratorSpecializationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorSpecializationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSpecializationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
