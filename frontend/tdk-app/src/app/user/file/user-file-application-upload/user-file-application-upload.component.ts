
import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { User } from '../../../model/User';
import { ApplicationFile } from '../../../model/ApplicationFile';
import { visibilities } from '../../../model/Visibilities';
import { Conference } from '../../../model/Conference';
import { TDKFile } from '../../../model/TDKFile';
import { ApplicationFileService } from '../../../services/application-file.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../model/Application';
import { FileUploader } from 'ng2-file-upload';
import { ConferenceService } from '../../../services/conference.service';
import { NgFormSelectorWarning } from '@angular/forms';
@Component({
  selector: 'app-user-file-application-upload',
  templateUrl: './user-file-application-upload.component.html',
  styleUrls: ['./user-file-application-upload.component.css']
})
export class UserFileApplicationUploadComponent implements OnInit {
  user: User;
  applicationFile: ApplicationFile = new ApplicationFile();
  conferences: Conference[] = [];
  userApplications: Application[] = [];
  selectedApplication: Application = new Application();
  selectedConference: Conference = new Conference();
  userId: string = '';
  @ViewChild('fileUploadForm', { static: false, read: ElementRef }) fileUploadForm: ElementRef;
  @ViewChild('fileUploadButton', { static: false }) fileUploadButton: ElementRef;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef; files = [];
  public uploader: FileUploader = new FileUploader({ url: '/api/upload', itemAlias: 'file' });
  constructor(@Inject(LOCALE_ID) public locale: string, private applicationFileService: ApplicationFileService, private conferenceService: ConferenceService, private authenticationService: AuthenticationService, private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationFile.tdkFile = new TDKFile();
    this.getAuthenticatedUser();
    this.getApplications();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.applicationFile.tdkFile.fileName = response;
      if (this.locale == "en") {
        alert("Successful file upload!");
      } else {
        alert('Sikeres fájlfeltöltés!');
      }
    };
  }
  getApplications() {
    this.applicationService.getApplicationsByUserId(this.userId).subscribe(applications => {
      this.userApplications = applications;
    }, () => {
    });
  }
  getAuthenticatedUser() {
    this.userId = this.authenticationService.getActualUserId();
  }
  getConferenceFromId() {
    this.conferenceService.getConferenceById(this.selectedApplication.tdkConferenceId).subscribe(conference => {
      this.selectedConference = conference;
    }, () => {
    });
  }
  fileUploadFunction() {
    this.applicationFile.conferenceId = this.selectedApplication.tdkConferenceId;
    this.applicationFile.applicationId = this.selectedApplication._id;
    this.conferenceService.getConferenceById(this.selectedApplication.tdkConferenceId).subscribe(conference => {
      this.selectedConference = conference;
      let now = new Date();
      if (new Date(this.selectedConference.fileUploadClosingDate) < now) {
        if (this.locale == "en") {
          alert("The file upload deadline has expired, you do not have permission to upload a file for this application!");
        } else {
          alert("A fájl feltöltési határidő lejárt, nincs jogosultsága ehhez a jelentkezéshez fájlt feltölteni!");
        }
        return;
      }
      if (this.selectedApplication._id == undefined || this.selectedApplication._id == '') {
        if (this.locale == "en") {
          alert("Choose a TDK title");
        } else {
          alert("Válasszon ki egy TDK címet");
        }
        return;
      }

      this.applicationFile.tdkFile.visible = visibilities[0];
      this.applicationFile.tdkFile.date = new Date();
      this.applicationFile.userId = this.userId;
      let conf;
      if (this.locale == "en") {
        conf = confirm("Are you sure you want to upload the file?");
      } else {
        conf = confirm("Biztos, hogy szeretné feltölteni a fájlt?");
      }
      if (conf) {
        this.applicationFileService.addApplicationFile(this.userId, this.applicationFile).subscribe(() => {
          if (this.locale == "en") {
            alert("File upload is successful");
          } else {
            alert("A fájl feltöltése sikeres");
          }
          this.applicationFile = new ApplicationFile();
          this.applicationFile.tdkFile = new TDKFile();
          this.fileUploadForm.nativeElement.reset();
        }, () => {
          if (this.locale == "en") {
            alert("An error occurred while uploading the file");
          } else {
            alert("Hiba történt a fájl feltöltése során");
          }
          this.applicationFile = new ApplicationFile();
          this.applicationFile.tdkFile = new TDKFile();
          this.fileUploadForm.nativeElement.reset();
        });
      }
    }, () => {
      if (this.locale == "en") {
        alert("An error occurred while uploading the file");
      } else {
        alert("Hiba történt a fájl feltöltése során");
      }
    });


  }
}