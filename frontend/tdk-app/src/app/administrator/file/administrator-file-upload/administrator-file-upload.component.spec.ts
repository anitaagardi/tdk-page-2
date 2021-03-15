import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFileUploadComponent } from './administrator-file-upload.component';

describe('AdministratorFileUploadComponent', () => {
  let component: AdministratorFileUploadComponent;
  let fixture: ComponentFixture<AdministratorFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorFileUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
