import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Faculty } from '../../../model/Faculty';
import { Specialization } from '../../../model/Specialization';
import { TypeOfSpecialization } from '../../../model/TypeOfSpecialization';
import { FacultyService } from '../../../services/faculty.service';
import { SpecializationService } from '../../../services/specialization.service';
import { TypeOfSpecializationService } from '../../../services/typeOfSpecialization.service';

@Component({
  selector: 'app-administrator-specialization-create',
  templateUrl: './administrator-specialization-create.component.html',
  styleUrls: ['./administrator-specialization-create.component.css']
})
export class AdministratorSpecializationCreateComponent implements OnInit {
  @ViewChild('createSpecializationForm', { static: false, read: ElementRef }) createSpecializationForm: ElementRef;
  specialization: Specialization = new Specialization();
  faculties: Faculty[] = [];
  selectedFaculty: Faculty = new Faculty();
  typeOfSpecializations: TypeOfSpecialization[] = [];
  selectedTypeOfSpecialization: TypeOfSpecialization = new TypeOfSpecialization();
  constructor(private specializationService: SpecializationService, private facultyService: FacultyService, private typeOfSpecializationService: TypeOfSpecializationService) { }

  ngOnInit() {
    this.getFaculties();
    this.getTypeOfSpecializations();
  }
  addSpecialization() {
    let conf = confirm("Biztos, hogy szeretné felvinni a szakot?");
    this.specialization.facultyId = this.selectedFaculty._id;
    this.specialization.typeOfSpecializationId = this.selectedTypeOfSpecialization._id;
    if (conf) {
      this.specializationService.addSpecialization(this.specialization).subscribe(() => {
        alert("A szak felvitele sikeres");
        this.createSpecializationForm.nativeElement.reset();
        this.specialization = new Specialization();
      }, () => {
        alert("Hiba történt a szak felvietel során");
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
  getTypeOfSpecializations() {
    this.typeOfSpecializationService.getAllTypeOfSpecialization().subscribe(typeOfSpecializations => {
      this.typeOfSpecializations = typeOfSpecializations;
    }, () => {

    });
  }

}
