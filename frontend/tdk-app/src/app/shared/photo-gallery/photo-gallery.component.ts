import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent } from 'ngx-gallery';
import { PhotoGallery } from '../../model/PhotoGallery';
import { PhotoGalleryService } from '../../services/photo-gallery.service';
import { FILE_URL } from '../../constants';
import 'hammerjs';
import { visibilities } from '../../model/Visibilities';
@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  photoGalleries: PhotoGallery[] = [];
  actualPhotoGallery: PhotoGallery = null;
  fileUrl = FILE_URL;
  @ViewChild('gallery', { static: false }) gallery: NgxGalleryComponent;
  constructor(private photoGalleryService: PhotoGalleryService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getPhotoGalleries();

  }
  getPhotoGalleries() {
    this.photoGalleryService.getAllPhotoGalleries().subscribe(photoGalleries => {
      this.photoGalleries = photoGalleries.reverse();
    }, () => {

    }
    );
  }
  setActualPhotoGallery(photoGallery: PhotoGallery) {

    this.actualPhotoGallery = photoGallery;
    this.galleryImages = [];
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    for (let i = 0; i < this.actualPhotoGallery.tdkFiles.length; i++) {
      if (this.actualPhotoGallery.tdkFiles[i].visible == visibilities[0]) {
        this.galleryImages = [...this.galleryImages,
        {
          small: this.fileUrl + this.actualPhotoGallery.tdkFiles[i].fileName,
          medium: this.fileUrl + this.actualPhotoGallery.tdkFiles[i].fileName,
          big: this.fileUrl + this.actualPhotoGallery.tdkFiles[i].fileName
        }
        ]
      }
    }
    this.changeDetectorRefs.detectChanges();
    this.gallery.openPreview(0);
  }

}
