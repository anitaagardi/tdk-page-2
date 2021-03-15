import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TDKFile } from '../model/TDKFile';
import { ThesisFile } from '../model/ThesisFile';
import { Conference } from '../model/Conference';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ThesisFileService {
    thesisFiles: ThesisFile[] = [];
    conferences: Conference[] = [];
    tdkFiles: TDKFile[] = [];

    constructor(private http: HttpClient) {


    }
    addThesisFile(userId: string, thesisFile: ThesisFile): Observable<void> {
        return this.http.post<void>(`api/users/${userId}/thesisFiles`, thesisFile);
    }

    getThesisFiles(): Observable<ThesisFile[]> {
        return this.http.get<ThesisFile[]>(`api/thesisFiles`);
    }
    getThesisFilesByApplicationId(applicationId: string): Observable<ThesisFile[]> {
        return this.http.get<ThesisFile[]>(`api/applications/${applicationId}/thesisFiles`);
    }

    getUserThesisFiles(userId: string): Observable<ThesisFile[]> {
        return this.http.get<ThesisFile[]>(`api/users/${userId}/thesisFiles`);
    }
    deleteThesisFile(thesisFile: ThesisFile): Observable<void> {
        return this.http.delete<void>(`api/thesisFiles/${thesisFile._id}`);
    }

}