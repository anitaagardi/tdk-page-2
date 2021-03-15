import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileApplicationUploadComponent } from './user-file-application-upload.component';

describe('UserFileApplicationUploadComponent', () => {
  let component: UserFileApplicationUploadComponent;
  let fixture: ComponentFixture<UserFileApplicationUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFileApplicationUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileApplicationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
