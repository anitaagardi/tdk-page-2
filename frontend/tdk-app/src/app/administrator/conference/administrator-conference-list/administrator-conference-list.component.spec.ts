import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorConferenceListComponent } from './administrator-conference-list.component';

describe('AdministratorMenuConferenceListComponent', () => {
  let component: AdministratorConferenceListComponent;
  let fixture: ComponentFixture<AdministratorConferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorConferenceListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorConferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
