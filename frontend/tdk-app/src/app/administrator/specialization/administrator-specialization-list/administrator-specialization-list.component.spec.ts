import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSpecializationListComponent } from './administrator-specialization-list.component';

describe('AdministratorSpecializationListComponent', () => {
  let component: AdministratorSpecializationListComponent;
  let fixture: ComponentFixture<AdministratorSpecializationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorSpecializationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSpecializationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
