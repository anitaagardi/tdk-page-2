import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TDKSection } from '../../../model/TDKSection';
import { TDKSectionService } from '../../../services/tdkSection.service';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-administrator-tdksection-list',
  templateUrl: './administrator-tdksection-list.component.html',
  styleUrls: ['./administrator-tdksection-list.component.css']
})
export class AdministratorTDKSectionListComponent implements OnInit {
  tdkSectionListComponents: TDKSectionListComponent[] = [];
  tdkSections: TDKSection[] = [];
  displayedColumns: string[] = ['name', 'name_EN', 'faculty', 'faculty_EN', 'modify', 'delete'];
  dataSource = new MatTableDataSource(this.tdkSectionListComponents);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private tdkSectionService: TDKSectionService, private facultyService: FacultyService) { }

  ngOnInit() {
    this.getTDKSections();
  }
  getTDKSections() {
    this.tdkSectionListComponents = [];
    this.tdkSectionService.getAllTDKSection().subscribe(tdkSections => {
      this.tdkSections = tdkSections.reverse();
      for (let i = 0; i < this.tdkSections.length; i++) {
        let tdkSectionListComponent: TDKSectionListComponent = new TDKSectionListComponent();
        tdkSectionListComponent.tdkSection = tdkSections[i];
        this.tdkSectionListComponents.push(tdkSectionListComponent);
        this.getFacultyByFacultyId(tdkSectionListComponent);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.tdkSectionListComponents);
    }, () => {

    }
    );
  }
  getFacultyByFacultyId(tdkSectionListComponent: TDKSectionListComponent) {
    this.facultyService.getFacultyByFacultyId(tdkSectionListComponent.tdkSection.facultyId).subscribe(faculty => {
      tdkSectionListComponent.facultyName = faculty.name;
      tdkSectionListComponent.facultyName_EN = faculty.name_EN;
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    let filteredTDKSectionListComponent: TDKSectionListComponent[] = [];
    filteredTDKSectionListComponent = this.tdkSectionListComponents.filter(((tdkSectionListComponent) => {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      if (tdkSectionListComponent.tdkSection.name) {
        if (tdkSectionListComponent.tdkSection.name.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (tdkSectionListComponent.tdkSection.name_EN) {
        if (tdkSectionListComponent.tdkSection.name_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (tdkSectionListComponent.facultyName) {
        if (tdkSectionListComponent.facultyName.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (tdkSectionListComponent.facultyName_EN) {
        if (tdkSectionListComponent.facultyName_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }


    }));
    this.dataSource = new MatTableDataSource<TDKSectionListComponent>(filteredTDKSectionListComponent);
  }
  deleteTDKSection(tdkSection: TDKSection) {
    let conf = confirm("Biztos, hogy szeretné törölni a TDK szekciót?");
    if (conf) {
      this.tdkSectionService.deleteTDKSection(tdkSection).subscribe(() => {
        alert("A TDK szekció törlése sikeres");
        this.getTDKSections();
        this.dataSource = new MatTableDataSource(this.tdkSectionListComponents);
      }, () => {
        alert("Hiba történt a TDK szekció törlése során");
        this.getTDKSections();
        this.dataSource = new MatTableDataSource(this.tdkSectionListComponents);
      }
      );
    }
  }
  modifyTDKSection(tdkSection: TDKSection) {
    let conf = confirm("Biztos, hogy szeretné módosítani a TDK szekciót?");
    if (conf) {
      this.tdkSectionService.updateTDKSection(tdkSection).subscribe(() => {
        alert("A TDK szekció módosítása sikeres");
        this.getTDKSections();
      }, () => {
        alert("Hiba történt a TDK szekció módosítása során");
        this.getTDKSections();
      }
      );
    }
  }

}
class TDKSectionListComponent {
  tdkSection: TDKSection;
  facultyName: string;
  facultyName_EN: string;
}

