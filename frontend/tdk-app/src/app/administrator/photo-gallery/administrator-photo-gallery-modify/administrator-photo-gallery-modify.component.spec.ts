import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorPhotoGalleryModifyComponent } from './administrator-photo-gallery-modify.component';

describe('AdministratorPhotoGalleryModifyComponent', () => {
  let component: AdministratorPhotoGalleryModifyComponent;
  let fixture: ComponentFixture<AdministratorPhotoGalleryModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorPhotoGalleryModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorPhotoGalleryModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
