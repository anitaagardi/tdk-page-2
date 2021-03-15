import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFileUploadingDialogComponent } from './application-file-uploading-dialog.component';

describe('ApplicationFileUploadingDialogComponent', () => {
  let component: ApplicationFileUploadingDialogComponent;
  let fixture: ComponentFixture<ApplicationFileUploadingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFileUploadingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFileUploadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
