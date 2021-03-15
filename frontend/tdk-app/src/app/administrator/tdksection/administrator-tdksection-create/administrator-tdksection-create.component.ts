import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Faculty } from '../../../model/Faculty';
import { TDKSection } from '../../../model/TDKSection';
import { FacultyService } from '../../../services/faculty.service';
import { TDKSectionService } from '../../../services/tdkSection.service';

@Component({
  selector: 'app-administrator-tdksection-create',
  templateUrl: './administrator-tdksection-create.component.html',
  styleUrls: ['./administrator-tdksection-create.component.css']
})
export class AdministratorTDKSectionCreateComponent implements OnInit {
  @ViewChild('createTDKSectionForm', { static: false, read: ElementRef }) createTDKSectionForm: ElementRef;
  tdkSection: TDKSection = new TDKSection();
  faculties: Faculty[] = [];
  selectedFaculty: Faculty = new Faculty();

  constructor(private tdkSectionService: TDKSectionService, private facultyService: FacultyService) { }

  ngOnInit() {
    this.getFaculties();
  }
  addTDKSection() {
    let conf = confirm("Biztos, hogy szeretné felvinni a tdk szekciót?");
    this.tdkSection.facultyId = this.selectedFaculty._id;
    if (conf) {
      this.tdkSectionService.addTDKSection(this.tdkSection).subscribe(() => {
        alert("A tdk szekció felvitele sikeres");
        this.createTDKSectionForm.nativeElement.reset();
        this.tdkSection = new TDKSection();
      }, () => {
        alert("Hiba történt a tdk szekció felvitel során");
      }
      );
    }
  }
  getFaculties() {
    this.facultyService.getAllFaculty().subscribe(faculties => {
      this.faculties = faculties;
    }, () => {

    });

  }

}
