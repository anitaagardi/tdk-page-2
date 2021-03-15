import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FILE_URL } from '../../../constants';
import { TDKFile } from '../../../model/TDKFile';
import { PhotoGalleryService } from '../../../services/photo-gallery.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PhotoGallery } from '../../../model/PhotoGallery';
import { ActivatedRoute } from '@angular/router';
import { visibilities } from '../../../model/Visibilities';
import { TDKFileService } from '../../../services/tdk-file.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-administrator-photo-gallery-modify',
  templateUrl: './administrator-photo-gallery-modify.component.html',
  styleUrls: ['./administrator-photo-gallery-modify.component.css']
})
export class AdministratorPhotoGalleryModifyComponent implements OnInit {
  photoGalleryId: string = '';
  photoGallery: PhotoGallery;
  tdkFiles: TDKFile[] = [];
  fileUrl = FILE_URL;
  newTDKFile: TDKFile = new TDKFile();
  displayedColumns: string[] = ['fileName', 'date', 'url', 'visibility', 'operations'];
  dataSource = new MatTableDataSource(this.tdkFiles);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public uploader: FileUploader = new FileUploader({ url: '/api/upload', itemAlias: 'file' });
  @ViewChild('photoGalleryUploadForm', { static: false, read: ElementRef }) photoGalleryUploadForm: ElementRef;
  constructor(private photoGalleryService: PhotoGalleryService, private activeRoute: ActivatedRoute, private tdkFileService: TDKFileService) { }

  ngOnInit() {
    this.photoGalleryId = this.activeRoute.snapshot.queryParams['photoGalleryId'];
    this.getTDKFiles();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.newTDKFile.fileName = response;
      this.addTDKFileToPhotoGallery();
      alert('Sikeres fájlfeltöltés!');
    };
  }
  addTDKFileToPhotoGallery() {
    this.newTDKFile.visible = visibilities[0];
    this.newTDKFile.date = new Date();
    this.tdkFiles.push(this.newTDKFile);
    this.newTDKFile = new TDKFile();
    this.photoGalleryService.updatePhotoGallery(this.photoGallery).subscribe(() => {
      alert("Sikeresen hozzáadta a képet a fotó galériához");
      this.getTDKFiles();
    }, () => {
      alert("Hiba történt a fotó galéria  módosítása során");
    }
    );
  }

  getTDKFiles() {
    this.photoGalleryService.getPhotoGalleryByPhotoGalleryId(this.photoGalleryId).subscribe(photoGallery => {
      this.photoGallery = photoGallery;
      this.tdkFiles = this.photoGallery.tdkFiles;
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.tdkFiles);
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateTDKFileSetVisible(tdkFile: TDKFile) {

    let conf = confirm("Biztos, hogy szeretné módosítani a fájlt?");
    if (conf) {
      tdkFile.visible = visibilities[0];

      this.photoGalleryService.updatePhotoGallery(this.photoGallery).subscribe(() => {
        alert("Sikeresen modósította a képet");
      }, () => {
        alert("Hiba történt a kép módosítása során");
      }
      );
    }
  }
  updateTDKFileSetNotVisible(tdkFile: TDKFile) {

    let conf = confirm("Biztos, hogy szeretné módosítani a fájlt?");
    if (conf) {
      tdkFile.visible = visibilities[1];
      this.photoGalleryService.updatePhotoGallery(this.photoGallery).subscribe(() => {
        alert("Sikeresen modósította a képet");
      }, () => {
        alert("Hiba történt a kép módosítása során");
      }
      );
    }

  }
  mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

}
