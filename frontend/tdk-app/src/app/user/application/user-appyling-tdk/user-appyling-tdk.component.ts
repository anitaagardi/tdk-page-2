import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { Application } from '../../../model/Application';
import { taxations } from '../../../model/Taxations';
import { employees } from '../../../model/Employees';
import { Supervisor } from '../../../model/Supervisor';
import { Author } from '../../../model/Author';
import { ApplicationStatus } from '../../../model/ApplicationStatus';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { ApplicationService } from '../../../services/application.service';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from '../../../services/authentication.service';
import { ConferenceService } from '../../../services/conference.service';
import { Conference } from '../../../model/Conference';
import { ConferenceProject } from '../../../model/ConferenceProject';
import { positions } from '../../../model/Position';
import { NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { languages } from '../../../model/Language';
import { FacultyService } from '../../../services/faculty.service';
import { TypeOfSpecializationService } from '../../../services/typeOfSpecialization.service';
import { SpecializationService } from '../../../services/specialization.service';
import { TDKSectionService } from '../../../services/tdkSection.service';
import { Faculty } from '../../../model/Faculty';
import { TypeOfSpecialization } from '../../../model/TypeOfSpecialization';
import { Specialization } from '../../../model/Specialization';
import { TDKSection } from '../../../model/TDKSection';
import { taxations_EN } from '../../../model/Taxations_EN';
import { employees_EN } from '../../../model/Employees_EN';
import { positions_EN } from '../../../model/Position_EN';
import { languages_EN } from '../../../model/Language_EN';

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
  selector: 'app-user-appyling-tdk',
  templateUrl: './user-appyling-tdk.component.html',
  styleUrls: ['./user-appyling-tdk.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class UserAppylingTdkComponent implements OnInit {
  application: Application = new Application();

  supervisor: Supervisor = new Supervisor();
  createdSupervisors: Supervisor[] = [];
  createdSupervisorsSource: MatTableDataSource<Supervisor> = new MatTableDataSource([]);
  createdAuthorsSource: MatTableDataSource<Author> = new MatTableDataSource([]);
  author: Author = new Author();

  createdAuthors: Author[] = [];

  taxation = taxations;
  authorTaxation = taxations[0];
  actualDate = new Date();
  positions = positions;
  employees = employees;
  languages = languages;
  isGraduate: boolean = false;
  conferences: Conference[] = [];
  conferenceProjects: ConferenceProject[] = [];
  datamanagementPolicy: string;
  isCheckedDatamanagementPolicy: boolean = false;
  applicationsSameConference: Application[] = [];
  allFaculties: Faculty[] = [];
  allFacultyNames: string[] = [];
  allTypeOfSpecializations: TypeOfSpecialization[] = [];
  allTypeOfSpecializationNames: string[] = [];
  allSpecializations: Specialization[] = [];
  allSpecializationNames: string[] = [];
  allTDKSections: TDKSection[] = [];
  allTDKSectionNames: string[] = [];
  filteredSpecializations: Specialization[] = [];
  filteredSpecializationNames: string[] = [];
  filteredTDKSections: TDKSection[] = [];
  filteredTDKSectionNames: string[] = [];
  @ViewChild('applyingTDKForm', { static: false, read: ElementRef }) applyingTDKForm: ElementRef;
  @ViewChild('supervisorForm', { static: false, read: ElementRef }) supervisorForm: ElementRef;
  @ViewChild('authorForm', { static: false, read: ElementRef }) authorForm: ElementRef;
  @ViewChild('supervisorsTable', { static: false }) supervisorsTable: MatTable<any>;
  displayedColumnsSupervisors: string[] = ['name', 'position', 'faculty', 'institute', 'deleteSupervisor'];
  dataSourceSupervisors = new MatTableDataSource(this.createdSupervisors);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumnsAuthors: string[] = ['name', 'facultyName', 'specialization', 'year', 'isGraduate', 'neptunCode', 'idNumber', 'typeOfTheSpecialization', 'taxStatus', 'isEmployee', 'taxIdentificationNumber', 'birthPlace', 'birthDate', 'nameOfTheMother', 'zipCode', 'town', 'streetAndNumber', 'telephoneNumber', 'email', 'bankAccountNumber', 'deleteAuthor'];

  dataSourceAuthors = new MatTableDataSource(this.createdAuthors);
  @ViewChild(MatPaginator, { static: true }) paginatorAuthors: MatPaginator;
  @ViewChild('TableSupervisorPaginator', { static: true }) tableSupervisorPaginator: MatPaginator;
  @ViewChild('TableAuthorPaginator', { static: true }) tableAuthorPaginator: MatPaginator;
  constructor(@Inject(LOCALE_ID) public locale: string, private applicationService: ApplicationService,
    private authenticationService: AuthenticationService, private conferenceService: ConferenceService, private facultyService: FacultyService, private typeOfSpecializationService: TypeOfSpecializationService, private specializationService: SpecializationService, private tdkSectionService: TDKSectionService, private _ngZone: NgZone) {


  }

  ngOnInit() {
    this.application = new Application();
    this.supervisor = new Supervisor();
    this.author = new Author();
    this.getConferences();
    this.getFaculties();
    this.getTypeOfSpecializations();
    this.getSpecializations();
    this.getTDKSections();
    this.initApplicationValues();


  }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  initApplicationValues() {
    this.createdAuthors = [];
    this.createdSupervisors = [];
    this.application.summary = "";

    if (this.locale == "en") {
      this.taxation = taxations_EN;
      this.employees = employees_EN;
      this.positions = positions_EN;
      this.languages = languages_EN;
    }
    else {
      this.taxation = taxations;
      this.employees = employees;
      this.positions = positions;
      this.languages = languages;
    }


    this.datamanagementPolicy = undefined;
    this.isCheckedDatamanagementPolicy = false;
    this.conferenceProjects = [];

    this.application.userId = this.authenticationService.getActualUserId();
  }
  getConferences() {
    this.conferenceService.getAllConferences().subscribe(conferences => {

      let now = new Date();
      for (let i = 0; i < conferences.length; i++) {
        if ((new Date(conferences[i].beginDate) <= now) && (new Date(conferences[i].endDate) >= now)) {
          this.conferences.push(conferences[i]);
        }
      }
    }, () => {

    });
  }
  getFaculties() {
    this.facultyService.getAllFaculty().subscribe(faculties => {
      this.allFaculties = faculties;
      this.allFacultyNames = [];
      if (this.locale == "en") {
        for (let i = 0; i < this.allFaculties.length; i++) {
          this.allFacultyNames.push(this.allFaculties[i].name_EN);
        }
      } else {
        for (let i = 0; i < this.allFaculties.length; i++) {
          this.allFacultyNames.push(this.allFaculties[i].name);
        }
      }
    }, () => {

    }
    );
  }
  getTypeOfSpecializations() {
    this.typeOfSpecializationService.getAllTypeOfSpecialization().subscribe(typeOfSpecializations => {
      this.allTypeOfSpecializations = typeOfSpecializations;
      this.allTypeOfSpecializationNames = [];
      if (this.locale == "en") {
        for (let i = 0; i < this.allFaculties.length; i++) {
          this.allTypeOfSpecializationNames.push(this.allTypeOfSpecializations[i].name_EN);
        }
      } else {
        for (let i = 0; i < this.allTypeOfSpecializations.length; i++) {
          this.allTypeOfSpecializationNames.push(this.allTypeOfSpecializations[i].name);
        }
      }
    }, () => {

    }
    );
  }
  getSpecializations() {
    this.specializationService.getAllSpecialization().subscribe(specializations => {
      this.allSpecializations = specializations;
    }, () => {

    }
    );
  }
  getTDKSections() {
    this.tdkSectionService.getAllTDKSection().subscribe(tdkSections => {
      this.allTDKSections = tdkSections;

    }, () => {

    }
    );
  }


  searchConferenceProjects() {
    this.conferenceProjects = [];
    this.applyingTDKForm.nativeElement.reset();

    const actualConference: Conference = this.conferences.filter(conf => conf._id === this.application.tdkConferenceId)[0];
    if (actualConference == undefined) {
      if (this.locale == "en") {
        alert("Choose a conference!")
      } else {
        alert("Válasszon ki egy konferenciát!")
      }
      return;
    }
    for (let i = 0; i < actualConference.projects.length; i++) {
      this.conferenceProjects.push(new ConferenceProject(actualConference.projects[i], false));
    }
  }
  getDatamanagementPolicy() {
    const actualConference: Conference = this.conferences.filter(conf => conf._id === this.application.tdkConferenceId)[0];
    if (actualConference != undefined) {
      if (this.locale == "en") {
        this.datamanagementPolicy = actualConference.dataManagementPolicy_EN;
      } else {
        this.datamanagementPolicy = actualConference.dataManagementPolicy;
      }
    }
  }
  onChangeApplicationFacultyName(facultyName: string) {
    let actualFaculty: Faculty;
    if (this.locale == "en") {
      actualFaculty = this.allFaculties.filter(faculty => faculty.name_EN === facultyName)[0];
    } else {
      actualFaculty = this.allFaculties.filter(faculty => faculty.name === facultyName)[0];
    }
    this.filteredTDKSections = this.allTDKSections.filter(tdkSection => tdkSection.facultyId === actualFaculty._id);
    this.filteredTDKSectionNames = [];
    if (this.locale == "en") {
      for (let i = 0; i < this.filteredTDKSections.length; i++) {
        this.filteredTDKSectionNames.push(this.filteredTDKSections[i].name_EN);
      }
    } else {
      for (let i = 0; i < this.filteredTDKSections.length; i++) {
        this.filteredTDKSectionNames.push(this.filteredTDKSections[i].name);
      }
    }
  }
  onChangeAuthorFacultyName(facultyName: string) {
    let actualFaculty: Faculty;
    let actualTypeOfSpecialization: Faculty;

    if (this.locale == "en") {
      actualFaculty = this.allFaculties.filter(faculty => faculty.name_EN === facultyName)[0];
      actualTypeOfSpecialization = this.allTypeOfSpecializations.filter(typeOfSpecialization => typeOfSpecialization.name_EN === this.author.typeOfTheSpecialization)[0];
    } else {
      actualFaculty = this.allFaculties.filter(faculty => faculty.name === facultyName)[0];
      actualTypeOfSpecialization = this.allTypeOfSpecializations.filter(typeOfSpecialization => typeOfSpecialization.name === this.author.typeOfTheSpecialization)[0];
    }

    this.filteredSpecializations = this.allSpecializations.filter(specialization => (specialization.facultyId == actualFaculty._id) && (specialization.typeOfSpecializationId == actualTypeOfSpecialization._id));
    this.filteredSpecializationNames = [];
    if (this.locale == "en") {
      for (let i = 0; i < this.filteredSpecializations.length; i++) {
        this.filteredSpecializationNames.push(this.filteredSpecializations[i].name_EN);
      }
    } else {
      for (let i = 0; i < this.filteredSpecializations.length; i++) {
        this.filteredSpecializationNames.push(this.filteredSpecializations[i].name);
      }
    }
  }

  onChangeAuthorTypeOfSpecializationName(typeOfSpecializationName: string) {
    let actualFaculty: Faculty;
    let actualTypeOfSpecialization: Faculty;
    if (this.locale == "en") {
      actualTypeOfSpecialization = this.allTypeOfSpecializations.filter(typeOfSpecialization => typeOfSpecialization.name_EN === typeOfSpecializationName)[0];
      actualFaculty = this.allFaculties.filter(faculty => faculty.name_EN === this.author.facultyName)[0];
    } else {
      actualTypeOfSpecialization = this.allTypeOfSpecializations.filter(typeOfSpecialization => typeOfSpecialization.name === typeOfSpecializationName)[0];
      actualFaculty = this.allFaculties.filter(faculty => faculty.name === this.author.facultyName)[0];
    }
    this.filteredSpecializations = this.allSpecializations.filter(specialization => (specialization.facultyId == actualFaculty._id) && (specialization.typeOfSpecializationId == actualTypeOfSpecialization._id));
    this.filteredSpecializationNames = [];
    if (this.locale == "en") {
      for (let i = 0; i < this.filteredSpecializations.length; i++) {
        this.filteredSpecializationNames.push(this.filteredSpecializations[i].name_EN);
      }
    } else {
      for (let i = 0; i < this.filteredSpecializations.length; i++) {
        this.filteredSpecializationNames.push(this.filteredSpecializations[i].name);
      }
    }
  }

  onChangeConference(conferenceId: string) {
    this.conferenceProjects = [];
    const actualConference: Conference = this.conferences.filter(conf => conf._id === conferenceId)[0];
    for (let i = 0; i < actualConference.projects.length; i++) {
      this.conferenceProjects.push(new ConferenceProject(actualConference.projects[i], false));
    }
    if (this.locale == "en") {
      this.datamanagementPolicy = actualConference.dataManagementPolicy_EN;
    } else {
      this.datamanagementPolicy = actualConference.dataManagementPolicy;
    }
  }

  onChangeNeptunCode(neptunCode: string) {
    this.applicationsSameConference = [];
    if (this.application.tdkConferenceId != undefined) {
      this.applicationService.getApplicationsByConferenceId(this.application.tdkConferenceId).subscribe(
        (application) => {
          for (let i = 0; i < application.length; i++) {
            for (let j = 0; j < application[i].authors.length; j++) {
              if (application[i].authors[j].neptunCode == neptunCode) {
                this.applicationsSameConference.push(application[i]);
              }
            }
          }
        }, () => {

        }
      );


    }
  }

  applyingTDK() {
    if (this.createdAuthors.length > 0 && this.createdSupervisors.length > 0) {
      this.application.supervisors = this.createdSupervisors;
      this.application.authors = this.createdAuthors;
      this.application.status = ApplicationStatus.APPLIED.toString();
      this.application.isEmailSentToReviewer = false;
      for (let i = 0; i < this.conferenceProjects.length; i++) {
        if (this.conferenceProjects[i].isChecked) {
          this.application.projects.push(this.conferenceProjects[i].name);
        }
      }

    }
    if (this.application.tdkConferenceId == null || this.application.tdkConferenceId == undefined || this.application.tdkConferenceId == "") {
      if (this.locale == "en") {
        alert('Enter the TDK conference');
      } else {
        alert('Adja meg a TDK konferenciát');
      }
      return;
    }
    if (this.application.facultyName == null || this.application.facultyName == undefined || this.application.facultyName == "") {
      if (this.locale == "en") {
        alert('Enter the faculty');
      } else {
        alert('Adja meg a kart');
      }
      return;
    }
    if (this.application.facultySectionName == null || this.application.facultySectionName == undefined || this.application.facultySectionName == "") {
      if (this.locale == "en") {
        alert('Enter the faculty section');
      } else {
        alert('Adja meg a kari szekciót');
      }
      return;
    }
    if (this.application.language == null || this.application.language == undefined || this.application.language == "") {
      if (this.locale == "en") {
        alert('Enter the language of the TDK thesis');
      } else {
        alert('Adja meg a TDK dolgozat nyelvét');
      }
      return;
    }

    if (this.createdAuthors.length == 0) {
      if (this.locale == "en") {
        alert('Enter at least one author');
      } else {
        alert('Adjon meg legalább egy szerzőt');
      }
      return;
    }
    if (this.createdSupervisors.length == 0) {
      if (this.locale == "en") {
        alert('Enter at least one supervisor');
      } else {
        alert('Adjon meg legalább egy témavezetőt');
      }
      return;
    }
    if (!this.isCheckedDatamanagementPolicy) {
      if (this.locale == "en") {
        alert('The data management policy should also be adopted');
      } else {
        alert('Az adatkezelési szabályzatot is el kell fogadni');
      }
      return;
    }
    if (this.application.summary.length < 1000) {
      if (this.locale == "en") {
        alert('You have entered less than 1000 characters in the TDK thesis summary');
      } else {
        alert('Kevesebb mint 1000 karaktert adott meg a dolgozat összefoglalásánál');
      }
      return;
    }
    if (this.application.summary.length > 2000) {
      if (this.locale == "en") {
        alert('You have entered more than 2000 characters in the TDK thesis summary');
      } else {
        alert('Több mint 2000 karaktert adott meg a dolgozat összefoglalásánál');
      }
      return;
    }

    let conf = confirm("Biztos, hogy szeretne jelentkezni a konferenciára?");
    if (conf) {
      this.applicationService.addApplication(this.authenticationService.getActualUserId(), this.application, this.locale).subscribe(
        () => {
          if (this.locale == "en") {
            alert('Conference application is successful');
          } else {
            alert('A konferencia jelentkezés sikeres');
          }
        }, () => {
          if (this.locale == "en") {
            alert('Conference application is not successful');
          } else {
            alert("A konferencia jelentkezés nem sikerült");
          }
        }, () => {
          this.initApplicationValues();
          this.applyingTDKForm.nativeElement.reset();
          this.createdSupervisorsSource.data = [...this.createdSupervisors];
          this.createdAuthorsSource.data = [...this.createdAuthors];
        }
      );
    }
  }
  addNewSupervisor() {
    if (this.supervisor.faculty == null || this.supervisor.faculty == undefined || this.supervisor.faculty == "") {
      if (this.locale == "en") {
        alert('Enter the faculty of the supervisor');
      } else {
        alert('Adja meg a témavezető mely karon dolgozik');
      }
      return;
    }
    if (this.supervisor.position == null || this.supervisor.position == undefined || this.supervisor.position == "") {
      if (this.locale == "en") {
        alert('Enter, the position of the supervisor');
      } else {
        alert('Adja meg a témavezető munkakörét');
      }
      return;
    }
    this.createdSupervisors.push(this.supervisor);
    this.supervisor = new Supervisor();
    this.supervisorForm.nativeElement.reset();
    this.createdSupervisorsSource.data = [...this.createdSupervisors];
    this.supervisor.faculty = this.allFaculties[0].name;
  }
  removeSupervisor(supervisor: Supervisor) {
    this.createdSupervisors = this.createdSupervisors.filter(actualSupervisor => actualSupervisor != supervisor);
    this.createdSupervisorsSource.data = [...this.createdSupervisors];
  }
  addNewAuthor() {
    if (this.author.facultyName == null || this.author.facultyName == undefined || this.author.facultyName == "") {
      if (this.locale == "en") {
        alert('Enter the faculty of the author');
      } else {
        alert('Adja meg a szerző mely karon tanul');
      }
      return;
    }
    if (this.author.typeOfTheSpecialization == null || this.author.typeOfTheSpecialization == undefined || this.author.typeOfTheSpecialization == "") {
      if (this.locale == "en") {
        alert('Enter the type of the specialization of the author');
      } else {
        alert('Adja meg a képzés típusát');
      }
      return;
    }
    if (this.author.specialization == null || this.author.specialization == undefined || this.author.specialization == "") {
      if (this.locale == "en") {
        alert('Enter the specialization of the author');
      } else {
        alert('Adja meg a szak nevét');
      }
      return;
    }
    if (this.author.birthDate > new Date()) {
      if (this.locale == "en") {
        alert('Enter valid birthdate');
      } else {
        alert('Adjon meg érvényes születési dátumot');
      }
      return;
    }

    if (this.isGraduate) {
      if (this.locale == "en") {
        this.author.isGraduate = "Yes";
      } else {
        this.author.isGraduate = "Igen";
      }
    } else {
      if (this.locale == "en") {
        this.author.isGraduate = "No";
      } else {
        this.author.isGraduate = "Nem";
      }
    }
    this.createdAuthors.push(this.author);
    this.author = new Author();
    this.authorForm.nativeElement.reset();
    this.createdAuthorsSource.data = [...this.createdAuthors];
  }
  removeAuthor(author: Author) {
    this.createdAuthors = this.createdAuthors.filter(actualAuthor => actualAuthor != author);
    this.createdAuthorsSource.data = [...this.createdAuthors];
  }

}

