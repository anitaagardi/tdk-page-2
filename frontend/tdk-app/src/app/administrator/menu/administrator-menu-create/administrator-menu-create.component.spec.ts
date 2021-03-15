import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMenuCreateComponent } from './administrator-menu-create.component';

describe('AdministratorMenuCreateComponent', () => {
  let component: AdministratorMenuCreateComponent;
  let fixture: ComponentFixture<AdministratorMenuCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMenuCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMenuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
