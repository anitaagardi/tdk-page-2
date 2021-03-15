import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TDKFile } from '../model/TDKFile';
import { ThesisFile } from '../model/ThesisFile';
import { Conference } from '../model/Conference';
import { HttpClient } from '@angular/common/http';
import { ApplicationFile } from '../model/ApplicationFile';
@Injectable()
export class ApplicationFileService {
    applicationFiles: ApplicationFile[] = [];
    conferences: Conference[] = [];
    tdkFiles: TDKFile[] = [];

    constructor(private http: HttpClient) {


    }
    addApplicationFile(userId: string, applicationFile: ApplicationFile): Observable<void> {
        return this.http.post<void>(`api/users/${userId}/applicationFiles`, applicationFile);
    }

    getApplicationFiles(): Observable<ApplicationFile[]> {
        return this.http.get<ApplicationFile[]>(`api/applicationFiles`);
    }
    getApplicationFilesByApplicationId(applicationId: string): Observable<ApplicationFile[]> {
        return this.http.get<ApplicationFile[]>(`api/applications/${applicationId}/applicationFiles`);
    }

    getUserApplicationFiles(userId: string): Observable<ApplicationFile[]> {
        return this.http.get<ApplicationFile[]>(`api/users/${userId}/applicationFiles`);
    }
    deleteApplicationFile(applicationFile: ApplicationFile): Observable<void> {
        return this.http.delete<void>(`api/applicationFiles/${applicationFile._id}`);
    }

}