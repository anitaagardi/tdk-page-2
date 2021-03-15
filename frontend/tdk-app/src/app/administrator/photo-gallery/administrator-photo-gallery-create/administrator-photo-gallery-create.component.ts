import { Component, ElementRef, OnInit } from '@angular/core';
import { PhotoGallery } from '../../../model/PhotoGallery';
import { TDKFile } from '../../../model/TDKFile';
import { FileUploader } from 'ng2-file-upload';
import { PhotoGalleryService } from '../../../services/photo-gallery.service';
import { visibilities } from '../../../model/Visibilities';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FILE_URL } from '../../../constants';

@Component({
  selector: 'app-administrator-photo-gallery-create',
  templateUrl: './administrator-photo-gallery-create.component.html',
  styleUrls: ['./administrator-photo-gallery-create.component.css']
})
export class AdministratorPhotoGalleryCreateComponent implements OnInit {
  photoGallery: PhotoGallery = new PhotoGallery();
  tdkFiles: TDKFile[] = [];
  tdkFile: TDKFile = new TDKFile();
  fileUrl = FILE_URL;
  public uploader: FileUploader = new FileUploader({ url: '/api/upload', itemAlias: 'file', allowedFileType: ['image'] });
  @ViewChild('photoGalleryUploadForm', { static: false, read: ElementRef }) photoGalleryUploadForm: ElementRef;

  dataSourcePhotoGallery = new MatTableDataSource(this.tdkFiles);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumnsPhotoGallery: string[] = ['photo', 'delete'];
  constructor(private photoGalleryService: PhotoGalleryService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.tdkFile.fileName = response;
      this.addTDKFile();
      alert('Sikeres fájlfeltöltés!');
    };
  }
  addTDKFile() {
    this.tdkFile.visible = visibilities[0];
    this.tdkFile.date = new Date();
    this.tdkFile._id = this.mongoObjectId();
    this.tdkFiles.push(this.tdkFile);
    this.tdkFile = new TDKFile();
    this.dataSourcePhotoGallery = new MatTableDataSource(this.tdkFiles);
  }
  removeTDKFile(tdkFile: TDKFile) {
    this.tdkFiles = this.tdkFiles.filter(actualTDKFile => actualTDKFile != tdkFile);
    this.dataSourcePhotoGallery = new MatTableDataSource(this.tdkFiles);
  }
  addPhotoGallery() {
    let conf = confirm("Biztos, hogy szeretné menteni a fotó galériát ?");
    if (conf) {
      this.photoGallery.tdkFiles = this.tdkFiles;
      this.photoGalleryService.addPhotoGallery(this.photoGallery).subscribe(() => {
        alert("A fotó galéria felvitele sikeres");
        this.photoGallery = new PhotoGallery();
        this.photoGallery.tdkFiles = [];
        this.photoGalleryUploadForm.nativeElement.reset();
        this.tdkFiles = [];
        this.dataSourcePhotoGallery = new MatTableDataSource(this.tdkFiles);
      }, () => {
        alert("Hiba történt a fotó galéria felvitele során");
        this.photoGallery = new PhotoGallery();
        this.photoGallery.tdkFiles = [];
        this.photoGalleryUploadForm.nativeElement.reset();
        this.tdkFiles = [];
        this.dataSourcePhotoGallery = new MatTableDataSource(this.tdkFiles);
      });
    }
  }
  mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }
}
