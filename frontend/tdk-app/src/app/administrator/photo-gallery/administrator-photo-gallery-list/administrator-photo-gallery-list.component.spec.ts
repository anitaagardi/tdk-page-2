import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorPhotoGalleryListComponent } from './administrator-photo-gallery-list.component';

describe('AdministratorPhotoGalleryListComponent', () => {
  let component: AdministratorPhotoGalleryListComponent;
  let fixture: ComponentFixture<AdministratorPhotoGalleryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorPhotoGalleryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorPhotoGalleryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
