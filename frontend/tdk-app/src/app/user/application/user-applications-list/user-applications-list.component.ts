import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { ConferenceService } from '../../../services/conference.service';
import { Application } from '../../../model/Application';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-applications-list',
  templateUrl: './user-applications-list.component.html',
  styleUrls: ['./user-applications-list.component.css']
})
export class UserApplicationsListComponent implements OnInit {
  applications: Application[] = [];
  userId: string = '';
  userApplications: Application[] = [];
  displayedColumns: string[] = ['tdkTitle', 'tdkTitle_EN', 'printApplication', 'facultySectionName', 'facultyName', 'equipments', 'language', 'supervisors', 'authors', 'projects'];
  dataSource = new MatTableDataSource(this.applications);
  accordionText: string[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(LOCALE_ID) public locale: string, private router: Router, private route: ActivatedRoute, private applicationService: ApplicationService, private authenticationService: AuthenticationService, private conferenceService: ConferenceService) { }

  ngOnInit() {
    this.getAuthenticatedUser();
    this.getApplications();
    this.dataSource = new MatTableDataSource(this.applications);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getApplications() {
    this.applications = [];

    this.applicationService.getApplicationsByUserId(this.userId).subscribe(applications => {
      this.userApplications = applications.reverse();
      this.dataSource = new MatTableDataSource(this.userApplications);
    }, () => {

    });
  }
  getAuthenticatedUser() {
    this.userId = this.authenticationService.getActualUserId();
  }
  generatePDF(application: Application) {
    this.router.navigate(['/user/applyingTDK/print'], {
      queryParams: {
        applicationId: application._id
      }
    });

  }

}
