import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorConferenceListParticipantsComponent } from './administrator-conference-list-participants.component';

describe('AdministratorConferenceListParticipantsComponent', () => {
  let component: AdministratorConferenceListParticipantsComponent;
  let fixture: ComponentFixture<AdministratorConferenceListParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorConferenceListParticipantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorConferenceListParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
