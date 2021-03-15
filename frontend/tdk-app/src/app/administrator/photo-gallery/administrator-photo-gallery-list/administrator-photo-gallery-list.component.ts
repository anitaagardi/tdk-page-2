import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotoGallery } from '../../../model/PhotoGallery';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PhotoGalleryService } from '../../../services/photo-gallery.service';
@Component({
  selector: 'app-administrator-photo-gallery-list',
  templateUrl: './administrator-photo-gallery-list.component.html',
  styleUrls: ['./administrator-photo-gallery-list.component.css']
})
export class AdministratorPhotoGalleryListComponent implements OnInit {
  photoGalleries: PhotoGallery[] = [];
  displayedColumns: string[] = ['name', 'operations'];
  dataSource = new MatTableDataSource(this.photoGalleries);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private photoGalleryService: PhotoGalleryService, private router: Router) { }

  ngOnInit() {
    this.getPhotoGalleries();

  }
  getPhotoGalleries() {
    this.photoGalleryService.getAllPhotoGalleries().subscribe(photoGalleries => {
      this.photoGalleries = photoGalleries.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.photoGalleries);
    }, () => {

    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deletePhotoGallery(photoGallery: PhotoGallery) {
    let conf = confirm("Biztos, hogy szeretné törölni a fotó galériát?");
    if (conf) {
      this.photoGalleryService.deletePhotoGallery(photoGallery).subscribe(() => {
        alert("A fotó galéria törlése sikeres");
        this.getPhotoGalleries();
      }, () => {
        alert("Hiba történt a fotó galéria törlése során");
        this.getPhotoGalleries();
      }
      );
    }
  }
  modifyTDKFiles(photoGallery: PhotoGallery) {
    this.router.navigate(['/photoGallery/tdkFiles/modify'], {
      queryParams: {
        photoGalleryId: photoGallery._id
      }
    });
  }
  updatePhotoGallery(photoGallery: PhotoGallery) {
    let conf = confirm("Biztos, hogy szeretné módosítani a fotó galériát?");
    if (conf) {
      this.photoGalleryService.updatePhotoGallery(photoGallery).subscribe(() => {
        alert("A fotó galéria módosítása sikeres");
        this.getPhotoGalleries();
      }, () => {
        alert("Hiba történt a fotó galéria módosítása során");
        this.getPhotoGalleries();
      }
      );
    }
  }


}
