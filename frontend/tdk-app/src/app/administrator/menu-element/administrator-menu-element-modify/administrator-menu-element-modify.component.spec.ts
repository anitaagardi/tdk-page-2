import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMenuElementModifyComponent } from './administrator-menu-element-modify.component';

describe('AdministratorMenuElementModifyComponent', () => {
  let component: AdministratorMenuElementModifyComponent;
  let fixture: ComponentFixture<AdministratorMenuElementModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMenuElementModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuElementModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
