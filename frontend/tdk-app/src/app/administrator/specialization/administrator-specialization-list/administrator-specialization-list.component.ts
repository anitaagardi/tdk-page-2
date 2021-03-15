import { Component, NgZone, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Specialization } from '../../../model/Specialization';
import { SpecializationService } from '../../../services/specialization.service';
import { FacultyService } from '../../../services/faculty.service';
import { TypeOfSpecializationService } from '../../../services/typeOfSpecialization.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-administrator-specialization-list',
  templateUrl: './administrator-specialization-list.component.html',
  styleUrls: ['./administrator-specialization-list.component.css']
})
export class AdministratorSpecializationListComponent implements OnInit {
  specializationListComponents: SpecializationListComponent[] = [];
  specializations: Specialization[] = [];
  displayedColumns: string[] = ['name', 'name_EN', 'faculty', 'faculty_EN', 'typeOfSpecialization', 'typeOfSpecialization_EN', 'modify', 'delete'];
  dataSource = new MatTableDataSource(this.specializationListComponents);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('autosize', { static: false }) autosize: QueryList<CdkTextareaAutosize>;
  constructor(private _ngZone: NgZone, private specializationService: SpecializationService, private facultyService: FacultyService, private typeOfSpecializationService: TypeOfSpecializationService) { }

  ngOnInit() {
    this.getSpecializations();
  }
  triggerResize() {
    this._ngZone.onStable.pipe()
      .subscribe(() => {
        for (let i = 0; i < this.autosize.length; i++) {
          this.autosize[i].resizeToFitContent(true);
        }
      }
      );
  }

  getSpecializations() {
    this.specializationListComponents = [];
    this.specializationService.getAllSpecialization().subscribe(specializations => {
      this.specializations = specializations.reverse();
      for (let i = 0; i < this.specializations.length; i++) {
        let specializationListComponent: SpecializationListComponent = new SpecializationListComponent();
        specializationListComponent.specialization = specializations[i];
        this.specializationListComponents.push(specializationListComponent);
        this.getFacultyByFacultyId(specializationListComponent);
        this.getTypeOfSpecializationByTypeOfSpecializationId(specializationListComponent);
      }

      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.specializationListComponents);
    }, () => {

    }
    );
  }

  getFacultyByFacultyId(specializationListComponent: SpecializationListComponent) {
    this.facultyService.getFacultyByFacultyId(specializationListComponent.specialization.facultyId).subscribe(faculty => {
      specializationListComponent.facultyName = faculty.name;
      specializationListComponent.facultyName_EN = faculty.name_EN;
    }, () => {

    }
    );
  }
  getTypeOfSpecializationByTypeOfSpecializationId(specializationListComponent: SpecializationListComponent) {
    this.typeOfSpecializationService.getTypeOfSpecializationByTypeOfSpecializationId(specializationListComponent.specialization.typeOfSpecializationId).subscribe(typeOfSpecialization => {
      specializationListComponent.typeOfSpecializationName = typeOfSpecialization.name;
      specializationListComponent.typeOfSpecializationName_EN = typeOfSpecialization.name_EN;
    }, () => {

    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    let filteredSpecializationListComponent: SpecializationListComponent[] = [];
    filteredSpecializationListComponent = this.specializationListComponents.filter(((specializationListComponent) => {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      if (specializationListComponent.specialization.name) {
        if (specializationListComponent.specialization.name.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (specializationListComponent.specialization.name_EN) {
        if (specializationListComponent.specialization.name_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (specializationListComponent.facultyName) {
        if (specializationListComponent.facultyName.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (specializationListComponent.facultyName_EN) {
        if (specializationListComponent.facultyName_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (specializationListComponent.typeOfSpecializationName) {
        if (specializationListComponent.typeOfSpecializationName.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (specializationListComponent.typeOfSpecializationName_EN) {
        if (specializationListComponent.typeOfSpecializationName_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }


    }));
    this.dataSource = new MatTableDataSource<SpecializationListComponent>(filteredSpecializationListComponent);
  }

  deleteSpecialization(specialization: Specialization) {
    let conf = confirm("Biztos, hogy szeretné törölni a szakot?");
    if (conf) {
      this.specializationService.deleteSpecialization(specialization).subscribe(() => {
        alert("A szak törlése sikeres");
        this.getSpecializations();
      }, () => {
        alert("Hiba történt a szak törlése során");
        this.getSpecializations();
      }
      );
    }
  }
  modifySpecialization(specialization: Specialization) {
    let conf = confirm("Biztos, hogy szeretné módosítani a szakot?");
    if (conf) {
      this.specializationService.updateSpecialization(specialization).subscribe(() => {
        alert("A szak módosítása sikeres");
        this.getSpecializations();
      }, () => {
        alert("Hiba történt a szak módosítása során");
        this.getSpecializations();
      }
      );
    }
  }

}
class SpecializationListComponent {
  specialization: Specialization;
  facultyName: string;
  facultyName_EN: string;
  typeOfSpecializationName: string;
  typeOfSpecializationName_EN: string;
}
