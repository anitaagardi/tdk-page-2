import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Application } from '../../../model/Application';
import { Conference } from '../../../model/Conference';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../model/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { ConferenceService } from '../../../services/conference.service';
import { ApplicationService } from '../../../services/application.service';
import { TDKFileService } from '../../../services/tdk-file.service';
import { saveAs } from 'file-saver';
import { ApplicationFile } from '../../../model/ApplicationFile';
import { ApplicationFileService } from '../../../services/application-file.service';

@Component({
  selector: 'app-user-file-application-list',
  templateUrl: './user-file-application-list.component.html',
  styleUrls: ['./user-file-application-list.component.css']
})
export class UserFileApplicationListComponent implements OnInit {
  user: User;
  fileListComponents: FileListComponent[] = [];
  selectedConference: Conference = new Conference();
  displayedColumns: string[] = ['fileName', 'date', 'download', 'conference', 'tdkTitle', 'delete'];
  dataSource = new MatTableDataSource(this.fileListComponents);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(LOCALE_ID) public locale: string, private authenticationService: AuthenticationService, private applicationFileService: ApplicationFileService, private conferenceService: ConferenceService, private applicationService: ApplicationService, private tdkFileService: TDKFileService) { }

  ngOnInit() {
    this.getAllTDKFiles();
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(this.fileListComponents);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllTDKFiles() {
    let actualUserId = this.authenticationService.getActualUserId();
    this.applicationFileService.getUserApplicationFiles(actualUserId).subscribe((applicationFiles) => {
      let sortedApplicationFile = applicationFiles.reverse();
      for (let i = 0; i < sortedApplicationFile.length; i++) {
        let newFileListComponent = new FileListComponent();
        newFileListComponent.applicationFile = sortedApplicationFile[i];
        this.fileListComponents.push(newFileListComponent);
        this.getConference(this.fileListComponents[i]);
        this.getApplication(this.fileListComponents[i]);
      }
      this.dataSource = new MatTableDataSource(this.fileListComponents);

    }, () => {
    }
    );
  }
  getConference(fileListComponent: FileListComponent) {
    this.conferenceService.getConferenceById(fileListComponent.applicationFile.conferenceId).subscribe((conference) => {
      fileListComponent.conference = conference;
    }, () => {
    }
    );
  }
  getApplication(fileListComponent: FileListComponent) {
    this.applicationService.getApplicationById(fileListComponent.applicationFile.applicationId).subscribe((application) => {
      fileListComponent.application = application;
    }, () => {
    }
    );
  }
  downloadFile(fileName: string) {
    this.tdkFileService.downloadTDKFile(fileName).subscribe((downloadedFile) => {
      saveAs(downloadedFile, fileName);
    }, () => {
    }
    );
  }

  deleteFile(applicationFile: ApplicationFile) {
    this.conferenceService.getConferenceById(applicationFile.conferenceId).subscribe(conference => {
      this.selectedConference = conference;
      let now = new Date();
      if (new Date(this.selectedConference.fileUploadClosingDate) < now) {
        if (this.locale == "en") {
          alert("The file modification deadline has expired, you do not have permission to delete a file for this application!");
        } else {
          alert("A fájl módosítási határidő lejárt, nincs jogosultsága ehhez a jelentkezéshez fájlt törölni!");
        }
        return;
      }
      this.applicationFileService.deleteApplicationFile(applicationFile).subscribe(() => {
        if (this.locale == "en") {
          alert("File deleted successfully");
        } else {
          alert("Sikeresen törölte a fájlt");
        }
        this.fileListComponents = [];
        this.getAllTDKFiles();
        this.dataSource.paginator = this.paginator;
        this.dataSource = new MatTableDataSource(this.fileListComponents);

      }, () => {
        if (this.locale == "en") {
          alert("Error deleting file");
        } else {
          alert("Hiba történt a fájl törlése során");
        }
      }
      );
    }, () => {
      if (this.locale == "en") {
        alert("Error deleting file");
      } else {
        alert("Hiba történt a fájl törlése során");
      }
    });


  }

}
class FileListComponent {
  applicationFile: ApplicationFile;
  conference: Conference;
  application: Application;
}