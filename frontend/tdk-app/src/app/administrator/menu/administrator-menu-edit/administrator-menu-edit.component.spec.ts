import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMenuEditComponent } from './administrator-menu-edit.component';

describe('AdministratorMenuEditComponent', () => {
  let component: AdministratorMenuEditComponent;
  let fixture: ComponentFixture<AdministratorMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
