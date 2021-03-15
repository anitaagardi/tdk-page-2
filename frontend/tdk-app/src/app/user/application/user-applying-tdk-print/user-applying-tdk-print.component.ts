import { Component, OnInit, ViewChild, ElementRef, LOCALE_ID, Inject } from '@angular/core';
import { Application } from '../../../model/Application';
import 'jspdf-autotable';
import { ApplicationService } from '../../../services/application.service';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../../services/conference.service';
import { Conference } from '../../../model/Conference';
@Component({
  selector: 'app-user-applying-tdk-print',
  templateUrl: './user-applying-tdk-print.component.html',
  styleUrls: ['./user-applying-tdk-print.component.css']
})
export class UserApplyingTdkPrintComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  applications: Application[] = [];
  application: Application;
  applicationId: string = '';
  conference: Conference;
  conferences: Conference[] = [];
  localeDataManagementPolicy: string = "";
  constructor(@Inject(LOCALE_ID) public locale: string, private applicationService: ApplicationService, private conferenceService: ConferenceService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.applicationId = this.activeRoute.snapshot.queryParams['applicationId'];
    this.getApplications();

  }
  getApplications() {
    this.applicationService.getApplicationById(this.applicationId).subscribe(application => {
      this.application = application;

      this.getConference();
    });
  }
  getConference() {
    this.conferenceService.getConferenceById(this.application.tdkConferenceId).subscribe(conference => {
      this.conference = conference;
      if (this.locale == "en") {
        this.localeDataManagementPolicy = this.conference.dataManagementPolicy_EN;
      }
      else {
        this.localeDataManagementPolicy = this.conference.dataManagementPolicy;
      }
    });
  }

  generatePDF() {
    window.print();
  }
}
