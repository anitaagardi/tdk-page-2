import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelApplication } from 'src/app/model/ExcelApplication';
import * as XLSX from 'xlsx';
import { User } from 'src/app/model/User';
import { Conference } from 'src/app/model/Conference';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Reviewer } from 'src/app/model/Reviewer';
import { MatDialog } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ThesisFile } from 'src/app/model/ThesisFile';
import { ThesisFileService } from 'src/app/services/thesis-file.service';
import { FILE_URL } from 'src/app/constants';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ListComponent } from 'src/app/model/ListComponent';
import { Author } from 'src/app/model/Author';
import { Supervisor } from 'src/app/model/Supervisor';
import { ApplicationFileService } from 'src/app/services/application-file.service';
import { ApplicationFile } from 'src/app/model/ApplicationFile';
import { Application } from 'src/app/model/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { ReviewerDialogComponent } from 'src/app/shared/reviewer-dialog/reviewer-dialog.component';
import { ThesisFileUploadingDialogComponent } from 'src/app/shared/thesis-file-uploading-dialog/thesis-file-uploading-dialog.component';
import { ApplicationFileUploadingDialogComponent } from 'src/app/shared/application-file-uploading-dialog/application-file-uploading-dialog.component';
import { SummaryDialogComponent } from 'src/app/shared/summary-dialog/summary-dialog.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY.MM.DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-administrator-conference-list-participants',
  templateUrl: './administrator-conference-list-participants.component.html',
  styleUrls: ['./administrator-conference-list-participants.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
})
export class AdministratorConferenceListParticipantsComponent implements OnInit {
  users: User[];
  applications: Application[] = [];
  excelApplications: ExcelApplication[] = [];
  conference: Conference;
  conferences: Conference[] = [];
  selectedConference: Conference;
  newReviewer: Reviewer = new Reviewer();
  newThesisFile: ThesisFile = new ThesisFile();
  newApplicationFile: ApplicationFile = new ApplicationFile();
  listComponents: ListComponent[] = [];
  fileUrl = FILE_URL;
  @ViewChild('excelTable', { static: false }) excelTable: ElementRef;
  selectedConferenceId: string = "";
  displayedColumns: string[] = ['select', 'position', 'tdkTitle', 'operations', 'reviewers', 'isEmailSentToReviewer', 'delete', 'status', 'modification', 'printApplication', 'tdkTitle_EN', 'facultySectionName', 'facultyName', 'equipments', 'language', 'summary', 'supervisors', 'authors', 'projects', 'thesisFiles', 'addThesisFiles', 'applicationFiles', 'addApplicationFiles'];
  dataSource = new MatTableDataSource<ListComponent>(this.listComponents);
  selection = new SelectionModel<ListComponent>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private applicationService: ApplicationService, private thesisFileService: ThesisFileService, private applicationFileService: ApplicationFileService, private location: Location, private _ngZone: NgZone, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedConferenceId = params.get('id');
    });
    this.getApplications();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    let filteredListComponent: ListComponent[] = [];
    filteredListComponent = this.listComponents.filter(((listComponent) => {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      if (listComponent.application.tdkTitle) {
        if (listComponent.application.tdkTitle.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.tdkTitle_EN) {
        if (listComponent.application.tdkTitle_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.reviewers) {
        for (let i = 0; i < listComponent.application.reviewers.length; i++) {
          let reviewer: Reviewer = listComponent.application.reviewers[i];
          if (reviewer.name) {
            if (reviewer.name.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (reviewer.email) {
            if (reviewer.email.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (reviewer.workplace) {
            if (reviewer.workplace.toLowerCase().includes(filterValue)) {
              return true;
            }
          }


        }
      }
      if (listComponent.application.status) {
        if (listComponent.application.status.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.facultySectionName) {
        if (listComponent.application.facultySectionName.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.facultyName) {
        if (listComponent.application.facultyName.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.equipments) {
        if (listComponent.application.equipments.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.summary) {
        if (listComponent.application.summary.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (listComponent.application.language) {
        if (listComponent.application.language.toLowerCase().includes(filterValue)) {
          return true;
        }
      }

      if (listComponent.application.supervisors) {
        for (let i = 0; i < listComponent.application.supervisors.length; i++) {
          let supervisor: Supervisor = listComponent.application.supervisors[i];
          if (supervisor.name) {
            if (supervisor.name.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (supervisor.position) {
            if (supervisor.position.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (supervisor.faculty) {
            if (supervisor.faculty.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (supervisor.institute) {
            if (supervisor.institute.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
        }
      }

      if (listComponent.application.authors) {
        for (let i = 0; i < listComponent.application.authors.length; i++) {
          let author: Author = listComponent.application.authors[i];
          if (author.name) {
            if (author.name.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.facultyName) {
            if (author.facultyName.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.specialization) {
            if (author.specialization.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.year) {
            if (author.year.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.isGraduate) {
            if (author.year.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.neptunCode) {
            if (author.neptunCode.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.neptunCode) {
            if (author.neptunCode.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }

          if (author.idNumber) {
            if (author.idNumber.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.typeOfTheSpecialization) {
            if (author.typeOfTheSpecialization.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.taxStatus) {
            if (author.taxStatus.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.isEmployee) {
            if (author.isEmployee.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.taxIdentificationNumber) {
            if (author.taxIdentificationNumber.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.birthPlace) {
            if (author.birthPlace.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.birthDate) {
            if (author.birthDate.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.nameOfTheMother) {
            if (author.nameOfTheMother.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.zipCode) {
            if (author.zipCode.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.town) {
            if (author.town.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.streetAndNumber) {
            if (author.streetAndNumber.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.telephoneNumber) {
            if (author.telephoneNumber.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.email) {
            if (author.email.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
          }
          if (author.bankAccountNumber) {
            if (author.bankAccountNumber.toLowerCase().includes(filterValue)) {
              return true;
            }
          }

        }
        if (listComponent.application.projects) {
          for (let i = 0; i < listComponent.application.projects.length; i++) {
            let project = listComponent.application.projects[i];
            if (project.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
        }
        if (listComponent.thesisFiles) {
          for (let i = 0; i < listComponent.thesisFiles.length; i++) {
            let thesisFile: ThesisFile = listComponent.thesisFiles[i];
            if (thesisFile.tdkFile.date.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
            if (thesisFile.tdkFile.fileName.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
        }
        if (listComponent.applicationFiles) {
          for (let i = 0; i < listComponent.applicationFiles.length; i++) {
            let applicationFile: ApplicationFile = listComponent.applicationFiles[i];
            if (applicationFile.tdkFile.date.toString().toLowerCase().includes(filterValue)) {
              return true;
            }
            if (applicationFile.tdkFile.fileName.toLowerCase().includes(filterValue)) {
              return true;
            }
          }
        }
      }

    }));
    this.dataSource = new MatTableDataSource<ListComponent>(filteredListComponent);
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  addReviewerDialog(application): void {
    this.newReviewer = new Reviewer();
    const dialogRef = this.dialog.open(ReviewerDialogComponent, {
      width: '250px',
      data: { reviewer: this.newReviewer }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newReviewer = result;
      if (application.reviewers == undefined) {
        application.reviewers = [];
      }
      application.reviewers.push(this.newReviewer);
    });
  }
  addThesisFileDialog(listComponent: ListComponent): void {
    this.newThesisFile = new ThesisFile();
    const dialogRef = this.dialog.open(ThesisFileUploadingDialogComponent, {
      width: '250px',
      data: { thesisFile: this.newThesisFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newThesisFile = result;
      this.newThesisFile.applicationId = listComponent.application._id;
      this.newThesisFile.conferenceId = listComponent.application.tdkConferenceId;
      this.newThesisFile.userId = listComponent.application.userId;
      this.thesisFileService.addThesisFile(this.newThesisFile.userId, this.newThesisFile).subscribe(() => {
        alert("A fájl feltöltése sikeres");
        window.location.reload();
      }, () => {
        alert("Hiba történt a fájl feltöltése során");
      });
    });
  }
  addApplicationFileDialog(listComponent: ListComponent): void {
    this.newApplicationFile = new ApplicationFile();
    const dialogRef = this.dialog.open(ApplicationFileUploadingDialogComponent, {
      width: '250px',
      data: { applicationFile: this.newApplicationFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newApplicationFile = result;
      this.newApplicationFile.applicationId = listComponent.application._id;
      this.newApplicationFile.conferenceId = listComponent.application.tdkConferenceId;
      this.newApplicationFile.userId = listComponent.application.userId;
      this.applicationFileService.addApplicationFile(this.newApplicationFile.userId, this.newApplicationFile).subscribe(() => {
        alert("A fájl feltöltése sikeres");
        window.location.reload();
      }, () => {
        alert("Hiba történt a fájl feltöltése során");
      });
    });
  }
  summaryDialog(application): void {

    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '250px',
      data: { summary: application.summary }
    });

    dialogRef.afterClosed().subscribe(result => {
      application.summary = result;
    });
  }
  getApplications() {
    this.listComponents = [];
    this.applications = [];
    this.applicationService.getApplicationsByConferenceId(this.selectedConferenceId).subscribe(applications => {
      this.applications = applications.reverse();
      for (let i = 0; i < this.applications.length; i++) {
        const newListComponent = new ListComponent();
        newListComponent.application = applications[i];
        newListComponent.position = this.listComponents.length + 1;
        this.listComponents.push(newListComponent);
        this.getThesisFiles(this.listComponents[i]);
        this.getApplicationFiles(this.listComponents[i]);
      }

      this.dataSource = new MatTableDataSource<ListComponent>(this.listComponents);

    }, () => {
    });

  }
  deleteThesisFile(thesisFile: ThesisFile) {
    let conf = confirm("Biztos, hogy szeretné törölni a fájlt?");
    if (conf) {
      this.thesisFileService.deleteThesisFile(thesisFile).subscribe(() => {
        alert("Sikeresen törölte a fájlt")
        window.location.reload();
      }, () => {
        alert("Hiba történt a fájl törlése során");
      }
      );
    }
  }
  deleteApplicationFile(applicationFile: ApplicationFile) {
    let conf = confirm("Biztos, hogy szeretné törölni a fájlt?");
    if (conf) {
      this.applicationFileService.deleteApplicationFile(applicationFile).subscribe(() => {
        alert("Sikeresen törölte a fájlt")
        window.location.reload();
      }, () => {
        alert("Hiba történt a fájl törlése során");
      }
      );
    }
  }

  getThesisFiles(listComponent: ListComponent) {
    this.thesisFileService.getThesisFilesByApplicationId(listComponent.application._id).subscribe((thesisFiles) => {
      listComponent.thesisFiles = thesisFiles;
    }, () => {

    }
    );
  }
  getApplicationFiles(listComponent: ListComponent) {
    this.applicationFileService.getApplicationFilesByApplicationId(listComponent.application._id).subscribe((applicationFiles) => {
      listComponent.applicationFiles = applicationFiles;
    }, () => {

    }
    );
  }
  deleteReviewer(reviewer: Reviewer, application: Application) {
    for (let i = 0; i < application.reviewers.length; i++) {
      if (application.reviewers[i].name == reviewer.name) {
        application.reviewers.splice(i, 1);
      }
    }
  }
  deleteApplication(application: Application) {
    let conf = confirm("Biztos, hogy szeretné törölni a jelentkezést?");
    if (conf) {
      this.applicationService.deleteApplication(application._id).subscribe(() => {
        alert("A jelentkezést sikeresen törölte");
        this.getApplications();
        //this.router.navigateByUrl(this.location.path());
        this.dataSource = new MatTableDataSource<ListComponent>(this.listComponents);
      }, () => {
        alert("Hiba történt a jelentkezés törlése során");
        this.getApplications();
      });
    }
  }
  setStatus(application: Application, status: string) {
    let conf = confirm("Biztos, hogy szeretné módosítani a jelentkezést?");
    if (conf) {
      if (status == "ACCEPTED") {
        application.status = "Elfogadott";
      } else if (status == "REJECTED") {
        application.status = "Elutasított";
      }
      this.applicationService.updateApplication(application).subscribe(() => {
        alert("Sikeresen módosította a jelentkezést");
        this.getApplications();
        //this.router.navigateByUrl(this.location.path());
        this.dataSource = new MatTableDataSource<ListComponent>(this.listComponents);
      }, () => {
        alert("Hiba történt a jelentkezés módosítása során");
        this.getApplications();
      });
    }
  }
  modifyApplication(application: Application) {
    this.applicationService.updateApplication(application).subscribe(async () => {
      alert("Sikeresen módosította a jelentkezést");
      this.getApplications();
      //this.router.navigateByUrl(this.location.path());
      this.dataSource = new MatTableDataSource<ListComponent>(this.listComponents);
    }, () => {
      alert("Hiba történt a jelentkezés módosítása során");
      this.getApplications();
    });
  }
  generatePDF(application: Application) {
    this.router.navigate(['/user/applyingTDK/print'], {
      queryParams: {
        applicationId: application._id
      }
    });

  }

  initExcel(selectedApplications: Application[]) {

    for (let i = 0; i < selectedApplications.length; i++) {
      let excelApplication: ExcelApplication = new ExcelApplication();
      excelApplication.status = selectedApplications[i].status;
      excelApplication.tdkTitle = selectedApplications[i].tdkTitle;
      excelApplication.tdkTitle_EN = selectedApplications[i].tdkTitle_EN
      excelApplication.facultySectionName = selectedApplications[i].facultySectionName;
      excelApplication.facultyName = selectedApplications[i].facultyName;
      excelApplication.equipments = selectedApplications[i].equipments;
      excelApplication.summary = selectedApplications[i].summary;
      excelApplication.language = selectedApplications[i].language;
      for (let j = 0; j < selectedApplications[i].supervisors.length; j++) {
        excelApplication.supervisorName += selectedApplications[i].supervisors[j].name + ' ; ';
        excelApplication.supervisorPosition += selectedApplications[i].supervisors[j].position + ' ; ';
        excelApplication.supervisorFaculty += selectedApplications[i].supervisors[j].faculty + ' ; ';
        excelApplication.supervisorInstitute += selectedApplications[i].supervisors[j].institute + ' ; ';
      }
      for (let j = 0; j < selectedApplications[i].authors.length; j++) {
        excelApplication.authorName += selectedApplications[i].authors[j].name + ' ; ';
        excelApplication.authorFacultyName += selectedApplications[i].authors[j].facultyName + ' ; ';
        excelApplication.authorSpecialization += selectedApplications[i].authors[j].specialization + ' ; ';
        excelApplication.authorYear += selectedApplications[i].authors[j].year + ' ; ';
        excelApplication.authorNeptunCode += selectedApplications[i].authors[j].neptunCode + ' ; ';
        excelApplication.authorIdNumber += selectedApplications[i].authors[j].idNumber + ' ; ';
        excelApplication.authorTypeOfTheSpecialization += selectedApplications[i].authors[j].typeOfTheSpecialization + ' ; ';
        excelApplication.authorTaxStatus += selectedApplications[i].authors[j].taxStatus + ' ; ';
        excelApplication.authorIsEmployee += selectedApplications[i].authors[j].isEmployee + ' ; ';
        excelApplication.authorTaxIdentificationNumber += selectedApplications[i].authors[j].taxIdentificationNumber + ' ; ';
        excelApplication.authorBirthPlace += selectedApplications[i].authors[j].birthPlace + ' ; ';
        excelApplication.authorBirthDate += selectedApplications[i].authors[j].birthDate.toLocaleString() + ' ; ';
        excelApplication.authorNameOfTheMother += selectedApplications[i].authors[j].nameOfTheMother + ' ; ';
        excelApplication.authorZipCode += selectedApplications[i].authors[j].zipCode + ' ; ';
        excelApplication.authorTown += selectedApplications[i].authors[j].town + ' ; ';
        excelApplication.authorStreetAndNumber += selectedApplications[i].authors[j].streetAndNumber + ' ; ';
        excelApplication.authorTelephoneNumber += selectedApplications[i].authors[j].telephoneNumber + ' ; ';
        excelApplication.authorEmail += selectedApplications[i].authors[j].email + ' ; ';
        excelApplication.authorBankAccountNumber += selectedApplications[i].authors[j].bankAccountNumber + ' ; ';
      }
      for (let j = 0; j < selectedApplications[i].projects.length; j++) {
        excelApplication.project += selectedApplications[i].projects[j] + ' ; ';
      }
      for (let j = 0; j < selectedApplications[i].reviewers.length; j++) {
        excelApplication.reviewerName += selectedApplications[i].reviewers[j].name + ' ; ';
        excelApplication.reviewerEmail += selectedApplications[i].reviewers[j].email + ' ; ';
        excelApplication.reviewerWorkplace += selectedApplications[i].reviewers[j].workplace + ' ; ';
      }
      this.excelApplications.push(excelApplication);


    }

  }
  writeExcel() {
    let selectedApplications: Application[] = [];
    this.listComponents.map(listComponent => {
      if (this.selection.isSelected(listComponent)) {
        selectedApplications.push(listComponent.application);
      }
    });
    if (selectedApplications.length == 0) {
      alert("Válasszon ki jelentkezéseket!");
      return;
    }

    this.initExcel(selectedApplications);
    setTimeout(() => {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.excelTable.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Statisztika');
      /* save to file */
      XLSX.writeFile(wb, 'Statisztika.xlsx');
    }, 204586560000);


  }
  sendEmailToReviewer() {
    let selectedApplications: Application[] = [];
    this.listComponents.map(listComponent => {
      if (this.selection.isSelected(listComponent)) {
        selectedApplications.push(listComponent.application);
      }
    });
    if (selectedApplications.length == 0) {
      alert("Válasszon ki jelentkezéseket!");
      return;
    }

    this.applicationService.sendEmailToReviewer(selectedApplications).subscribe(() => {
      alert("Sikeresen kiküldte az email-t a bírálóknak");
      for (let j = 0; j < selectedApplications.length; j++) {
        selectedApplications[j].isEmailSentToReviewer = true;
        this.applicationService.updateApplication(selectedApplications[j]).subscribe(() => {
          this.getApplications();
          //this.router.navigateByUrl(this.location.path());
          this.dataSource = new MatTableDataSource<ListComponent>(this.listComponents);
        });
      }

    }, () => {
      alert("Hiba történt az email küldése során");
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ListComponent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}

