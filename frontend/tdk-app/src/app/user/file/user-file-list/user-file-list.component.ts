import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../model/User';
import { ThesisFile } from '../../../model/ThesisFile';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThesisFileService } from '../../../services/thesis-file.service';
import { Conference } from '../../../model/Conference';
import { Application } from '../../../model/Application';
import { ConferenceService } from '../../../services/conference.service';
import { ApplicationService } from '../../../services/application.service';
import { TDKFileService } from '../../../services/tdk-file.service';
import { saveAs } from 'node_modules/file-saver';

@Component({
  selector: 'app-user-file-list',
  templateUrl: './user-file-list.component.html',
  styleUrls: ['./user-file-list.component.css']
})
export class UserFileListComponent implements OnInit {
  user: User;
  fileListComponents: FileListComponent[] = [];
  selectedConference: Conference = new Conference();
  displayedColumns: string[] = ['fileName', 'date', 'download', 'conference', 'tdkTitle', 'delete'];
  dataSource = new MatTableDataSource(this.fileListComponents);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(LOCALE_ID) public locale: string, private authenticationService: AuthenticationService, private thesisFileService: ThesisFileService, private conferenceService: ConferenceService, private applicationService: ApplicationService, private tdkFileService: TDKFileService) { }

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
    this.thesisFileService.getUserThesisFiles(actualUserId).subscribe((thesisFiles) => {
      let sortedThesisFile = thesisFiles.reverse();
      for (let i = 0; i < sortedThesisFile.length; i++) {
        let newFileListComponent = new FileListComponent();
        newFileListComponent.thesisFile = sortedThesisFile[i];
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
    this.conferenceService.getConferenceById(fileListComponent.thesisFile.conferenceId).subscribe((conference) => {
      fileListComponent.conference = conference;
    }, () => {

    }
    );
  }
  getApplication(fileListComponent: FileListComponent) {
    this.applicationService.getApplicationById(fileListComponent.thesisFile.applicationId).subscribe((application) => {
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

  deleteFile(thesisFile: ThesisFile) {
    this.conferenceService.getConferenceById(thesisFile.conferenceId).subscribe(conference => {
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
      this.thesisFileService.deleteThesisFile(thesisFile).subscribe(() => {
        if (this.locale == "en") {
          alert("You have successfully deleted the file");
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
  thesisFile: ThesisFile;
  conference: Conference;
  application: Application;
}





