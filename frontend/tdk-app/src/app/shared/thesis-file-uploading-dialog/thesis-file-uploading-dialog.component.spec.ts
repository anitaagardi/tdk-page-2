import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisFileUploadingDialogComponent } from './thesis-file-uploading-dialog.component';

describe('ThesisFileUploadingDialogComponent', () => {
  let component: ThesisFileUploadingDialogComponent;
  let fixture: ComponentFixture<ThesisFileUploadingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisFileUploadingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisFileUploadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
