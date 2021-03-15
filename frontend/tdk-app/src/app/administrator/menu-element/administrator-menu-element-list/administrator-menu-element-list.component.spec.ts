import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMenuElementListComponent } from './administrator-menu-element-list.component';

describe('AdministratorMenuElementListComponent', () => {
  let component: AdministratorMenuElementListComponent;
  let fixture: ComponentFixture<AdministratorMenuElementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMenuElementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
