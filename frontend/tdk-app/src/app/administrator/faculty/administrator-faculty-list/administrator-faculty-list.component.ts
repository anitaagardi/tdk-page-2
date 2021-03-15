import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Faculty } from 'src/app/model/Faculty';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-administrator-faculty-list',
  templateUrl: './administrator-faculty-list.component.html',
  styleUrls: ['./administrator-faculty-list.component.css']
})
export class AdministratorFacultyListComponent implements OnInit {
  faculties: Faculty[] = [];
  displayedColumns: string[] = ['name', 'name_EN', 'modify', 'delete'];
  dataSource = new MatTableDataSource(this.faculties);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private facultyService: FacultyService) { }

  ngOnInit() {
    this.getFaculties();
  }
  getFaculties() {
    this.facultyService.getAllFaculty().subscribe(faculties => {
      this.faculties = faculties.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.faculties);
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteFaculty(faculty: Faculty) {
    let conf = confirm("Biztos, hogy szeretné törölni a kart?");
    if (conf) {
      this.facultyService.deleteFaculty(faculty).subscribe(() => {
        alert("A kar törlése sikeres");
        this.getFaculties();
      }, () => {
        alert("Hiba történt a kar törlése során");
        this.getFaculties();
      }
      );
    }
  }
  modifyFaculty(faculty: Faculty) {
    let conf = confirm("Biztos, hogy szeretné módosítani a kart?");
    if (conf) {
      this.facultyService.updateFaculty(faculty).subscribe(() => {
        alert("A kar módosítása sikeres");
        this.getFaculties();
      }, () => {
        alert("Hiba történt a kar módosítása során");
        this.getFaculties();
      }
      );
    }
  }

}
