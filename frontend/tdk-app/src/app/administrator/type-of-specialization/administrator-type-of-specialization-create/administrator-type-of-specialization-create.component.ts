import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TypeOfSpecialization } from '../../../model/TypeOfSpecialization';
import { TypeOfSpecializationService } from '../../../services/typeOfSpecialization.service';

@Component({
  selector: 'app-administrator-type-of-specialization-create',
  templateUrl: './administrator-type-of-specialization-create.component.html',
  styleUrls: ['./administrator-type-of-specialization-create.component.css']
})
export class AdministratorTypeOfSpecializationCreateComponent implements OnInit {
  @ViewChild('createTypeOfSpecializationForm', { static: false, read: ElementRef }) createTypeOfSpecializationForm: ElementRef;
  typeOfSpecialization: TypeOfSpecialization = new TypeOfSpecialization();
  constructor(private typeOfSpecializationService: TypeOfSpecializationService) { }

  ngOnInit() {
  }
  addTypeOfSpecialization() {
    let conf = confirm("Biztos, hogy szeretné felvinni a képzési típust?");
    if (conf) {
      this.typeOfSpecializationService.addTypeOfSpecialization(this.typeOfSpecialization).subscribe(() => {
        alert("A képzési típus felvitele sikeres");
        this.createTypeOfSpecializationForm.nativeElement.reset();
        this.typeOfSpecialization = new TypeOfSpecialization();
      }, () => {
        alert("Hiba történt a képzési típus felvitel során");
      }
      );
    }
  }

}
