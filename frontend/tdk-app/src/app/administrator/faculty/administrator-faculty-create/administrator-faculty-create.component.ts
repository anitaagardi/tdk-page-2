import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Faculty } from 'src/app/model/Faculty';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-administrator-faculty-create',
  templateUrl: './administrator-faculty-create.component.html',
  styleUrls: ['./administrator-faculty-create.component.css']
})
export class AdministratorFacultyCreateComponent implements OnInit {
  @ViewChild('createFacultyForm', { static: false, read: ElementRef }) createFacultyForm: ElementRef;
  faculty: Faculty = new Faculty();
  constructor(private facultyService: FacultyService) { }

  ngOnInit() {
  }
  addFaculty() {
    let conf = confirm("Biztos, hogy szeretné felvinni a kart?");
    if (conf) {
      this.facultyService.addFaculty(this.faculty).subscribe(() => {
        alert("A kar felvitele sikeres");
        this.createFacultyForm.nativeElement.reset();
        this.faculty = new Faculty();
      }, () => {
        alert("Hiba történt a kar felvitel során");
      }
      );
    }
  }

}
