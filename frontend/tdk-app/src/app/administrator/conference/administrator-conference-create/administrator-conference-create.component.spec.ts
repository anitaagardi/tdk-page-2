import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorConferenceCreateComponent } from './administrator-conference-create.component';

describe('AdministratorMenuConferenceCreateComponent', () => {
  let component: AdministratorConferenceCreateComponent;
  let fixture: ComponentFixture<AdministratorConferenceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorConferenceCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorConferenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
