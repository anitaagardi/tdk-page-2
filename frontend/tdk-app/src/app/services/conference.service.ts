import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conference } from '../model/Conference';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ConferenceService {
    constructor(private http: HttpClient) {
    }

    getAllConferences(): Observable<Conference[]> {
        return this.http.get<Conference[]>('api/conferences');
    }
    getConferenceById(conferenceId: string): Observable<Conference> {
        return this.http.get<Conference>(`api/conferences/${conferenceId}`);
    }
    addConference(conference: Conference): Observable<void> {
        return this.http.post<void>('api/conferences', conference);
    }
    updateConference(conference: Conference): Observable<void> {
        return this.http.put<void>(`api/conferences/${conference._id}`, conference);
    }
    deleteConference(conference: Conference): Observable<void> {
        return this.http.delete<void>(`api/conferences/${conference._id}`);

    }
}

