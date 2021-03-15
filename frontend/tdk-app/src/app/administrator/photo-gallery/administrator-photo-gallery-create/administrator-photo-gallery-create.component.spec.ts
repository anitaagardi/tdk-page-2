import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorPhotoGalleryCreateComponent } from './administrator-photo-gallery-create.component';

describe('AdministratorPhotoGalleryCreateComponent', () => {
  let component: AdministratorPhotoGalleryCreateComponent;
  let fixture: ComponentFixture<AdministratorPhotoGalleryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorPhotoGalleryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorPhotoGalleryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
