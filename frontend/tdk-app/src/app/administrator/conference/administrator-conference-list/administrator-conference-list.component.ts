import { Component, OnInit, ViewChild, NgZone, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Conference } from 'src/app/model/Conference';
import { ConferenceService } from 'src/app/services/conference.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


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
  selector: 'app-administrator-conference-list',
  templateUrl: './administrator-conference-list.component.html',
  styleUrls: ['./administrator-conference-list.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdministratorConferenceListComponent implements OnInit {
  conferences: Conference[] = [];
  displayedColumns: string[] = ['name', 'operations', 'beginDate', 'endDate', 'fileUploadClosingDate', 'projects', 'dataManagenentPolicy', 'dataManagenentPolicy_EN'];
  dataSource = new MatTableDataSource(this.conferences);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  @ViewChildren('autosizeProject') autosizeProject: QueryList<CdkTextareaAutosize>;
  constructor(private conferenceService: ConferenceService, private router: Router, private _ngZone: NgZone, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.getConferences();

  }
  triggerResize() {
    this._ngZone.onStable.pipe()
      .subscribe(() => {
        this.autosize.resizeToFitContent(true);
        for (let i = 0; i < this.autosizeProject.length; i++) {
          this.autosizeProject[i].resizeToFitContent(true);
        }
      }
      );



  }
  getConferences() {
    this.conferenceService.getAllConferences().subscribe(conferences => {
      this.conferences = conferences.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.conferences);
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;


    let filteredConferenceComponent = this.conferences.filter(((conference) => {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      if (conference.dataManagementPolicy) {
        if (conference.dataManagementPolicy.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (conference.dataManagementPolicy_EN) {
        if (conference.dataManagementPolicy_EN.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (conference.name) {
        if (conference.name.toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      if (conference.projects) {
        for (let i = 0; i < conference.projects.length; i++) {
          if (conference.projects[i].toLowerCase().includes(filterValue)) {
            return true;
          }
        }
      }
    }));
    this.dataSource = new MatTableDataSource<Conference>(filteredConferenceComponent);
  }
  deleteConference(conference: Conference) {
    if (this.authenticationService.getActualUserPermission() == "kari admin") {
      alert("Nincs jogolsultsága törölni a konferenciát!");
      return;
    }
    let conf = confirm("Biztos, hogy szeretné törölni a konferenciát?");
    if (conf) {
      this.conferenceService.deleteConference(conference).subscribe(() => {
        alert("A konferencia törlése sikeres");
        this.getConferences();
      }, () => {
        alert("Hiba történt a konferencia törlése során");
        this.getConferences();
      }
      );
    }
  }

  getParticipants(conference: Conference) {
    this.router.navigate(['conference/list/participants', conference._id]);
  }
  updateConference(conference: Conference) {
    if (this.authenticationService.getActualUserPermission() == "kari admin") {
      alert("Nincs jogolsultsága módosítani a konferenciát!");
      return;
    }

    let conf = confirm("Biztos, hogy szeretné módosítani a konferenciát?");
    if (conf) {
      this.conferenceService.updateConference(conference).subscribe(() => {
        alert("A konferencia módosítása sikeres");
        this.getConferences();
      }, () => {
        alert("Hiba történt a konferencia módosítása során");
        this.getConferences();
      }
      );
    }
  }

}
