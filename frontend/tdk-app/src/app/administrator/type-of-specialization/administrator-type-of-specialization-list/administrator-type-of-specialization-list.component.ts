import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TypeOfSpecialization } from '../../../model/TypeOfSpecialization';
import { TypeOfSpecializationService } from '../../../services/typeOfSpecialization.service';

@Component({
  selector: 'app-administrator-type-of-specialization-list',
  templateUrl: './administrator-type-of-specialization-list.component.html',
  styleUrls: ['./administrator-type-of-specialization-list.component.css']
})
export class AdministratorTypeOfSpecializationListComponent implements OnInit {
  typeOfSpecializations: TypeOfSpecialization[] = [];
  displayedColumns: string[] = ['name', 'name_EN', 'modify', 'delete'];
  dataSource = new MatTableDataSource(this.typeOfSpecializations);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private typeOfSpecializationService: TypeOfSpecializationService) { }

  ngOnInit() {
    this.getTypeOfSpecializations();
  }
  getTypeOfSpecializations() {
    this.typeOfSpecializationService.getAllTypeOfSpecialization().subscribe(typeOfSpecializations => {
      this.typeOfSpecializations = typeOfSpecializations.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.typeOfSpecializations);
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization) {
    let conf = confirm("Biztos, hogy szeretné törölni a képzési típust?");
    if (conf) {
      this.typeOfSpecializationService.deleteTypeOfSpecialization(typeOfSpecialization).subscribe(() => {
        alert("A képzési típus törlése sikeres");
        this.getTypeOfSpecializations();
      }, () => {
        alert("Hiba történt a képzési típus törlése során");
        this.getTypeOfSpecializations();
      }
      );
    }
  }
  modifyTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization) {
    let conf = confirm("Biztos, hogy szeretné módosítani a képzési típust?");
    if (conf) {
      this.typeOfSpecializationService.updateTypeOfSpecialization(typeOfSpecialization).subscribe(() => {
        alert("A képzési típus módosítása sikeres");
        this.getTypeOfSpecializations();
      }, () => {
        alert("Hiba történt a képzési típus módosítása során");
        this.getTypeOfSpecializations();
      }
      );
    }
  }

}
