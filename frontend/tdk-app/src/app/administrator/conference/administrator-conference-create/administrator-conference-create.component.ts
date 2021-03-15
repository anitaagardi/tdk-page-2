import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Conference } from 'src/app/model/Conference';
import { ConferenceService } from 'src/app/services/conference.service';

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
  selector: 'app-administrator-conference-create',
  templateUrl: './administrator-conference-create.component.html',
  styleUrls: ['./administrator-conference-create.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdministratorConferenceCreateComponent implements OnInit {
  conference: Conference = new Conference();
  areDatesValid: boolean;
  project: string = "";
  createdProjects: string[] = [];
  createdProjectsSource: MatTableDataSource<string> = new MatTableDataSource([]);
  dataSourceProjects = new MatTableDataSource(this.createdProjects);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumnsAuthors: string[] = ['project', 'delete'];

  @ViewChild('createConferenceForm', { static: false, read: ElementRef }) createConferenceForm: ElementRef;
  @ViewChild('createProjectForm', { static: false, read: ElementRef }) createProjectForm: ElementRef;
  constructor(private conferenceService: ConferenceService) {
    this.conference.beginDate = new Date();
    this.conference.endDate = new Date();
    this.conference.fileUploadClosingDate = new Date();
  }

  ngOnInit() {
  }
  addConference() {
    let conf = confirm("Biztos, hogy szeretné felvinni a konferenciát?");
    if (conf) {
      this.conference.projects = this.createdProjects;
      this.conferenceService.addConference(this.conference).subscribe(() => {
        alert("A konferencia felvitele sikeres");
        this.createConferenceForm.nativeElement.reset();
        this.conference = new Conference();
        this.conference.beginDate = new Date();
        this.conference.endDate = new Date();
        this.conference.fileUploadClosingDate = new Date();
        this.createdProjects = [];
        this.project = "";
        this.createdProjectsSource.data = [...this.createdProjects];
      }, () => {
        alert("Hiba történt a konferencia felvitel során ");
      }
      );
    }
  }
  addProject() {
    this.createdProjects.push(this.project);
    this.createdProjectsSource.data = [...this.createdProjects];
    this.project = "";
    this.createProjectForm.nativeElement.reset();
  }
  removeProject(project: string) {
    this.createdProjects = this.createdProjects.filter(actualProject => actualProject != project);
    this.createdProjectsSource.data = [...this.createdProjects];
  }
}
