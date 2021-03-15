import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { Application } from '../model/Application';
import { Supervisor } from '../model/Supervisor';
import { Author } from '../model/Author';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApplicationService {
    applications: Application[] = [];
    users: User[];
    supervisors: Supervisor[];
    authors: Author[];
    constructor(private http: HttpClient) {

    }
    getAllApplications(): Observable<Application[]> {
        return this.http.get<Application[]>(`api/applications`);
    }
    getApplicationById(applicationId: string): Observable<Application> {
        return this.http.get<Application>(`api/applications/${applicationId}`);
    }
    getApplicationsByUserId(userId: string): Observable<Application[]> {
        return this.http.get<Application[]>(`api/users/${userId}/applications`);
    }
    getApplicationsByConferenceId(conferenceId: string): Observable<Application[]> {
        return this.http.get<Application[]>(`api/conferences/${conferenceId}/applications`);
    }
    addApplication(userId: string, application: Application, language: string): Observable<void> {
        return this.http.post<void>(`api/users/${userId}/applications/${language}`, application);
    }
    updateApplication(application: Application): Observable<void> {
        return this.http.put<void>(`api/applications/${application._id}`, application);
    }
    deleteApplication(applicationId: string): Observable<void> {
        return this.http.delete<void>(`api/applications/${applicationId}`);
    }
    sendEmailToReviewer(applications: Application[]): Observable<void> {
        return this.http.post<void>(`api/sendEmailToReviewer`, applications);
    }
}
