import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMenuElementCreateComponent } from './administrator-menu-element-create.component';

describe('AdministratorMenuElementCreateComponent', () => {
  let component: AdministratorMenuElementCreateComponent;
  let fixture: ComponentFixture<AdministratorMenuElementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMenuElementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuElementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
