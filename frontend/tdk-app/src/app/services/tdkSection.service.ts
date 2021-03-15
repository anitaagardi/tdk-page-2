import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TDKSection } from '../model/TDKSection';
@Injectable()
export class TDKSectionService {
    constructor(private http: HttpClient) {
    }

    getAllTDKSection(): Observable<TDKSection[]> {
        return this.http.get<TDKSection[]>('api/tdkSections');
    }
    getTDKSectionByTDKSectionId(tdkSectionId: string): Observable<TDKSection> {
        return this.http.get<TDKSection>(`api/tdkSections/${tdkSectionId}`);
    }
    getTDKSectionByFacultyId(facultyId: string): Observable<TDKSection> {
        return this.http.get<TDKSection>(`api/faculties/${facultyId}/tdkSections`);
    }
    addTDKSection(tdkSection: TDKSection): Observable<void> {
        return this.http.post<void>('api/tdkSections', tdkSection);
    }
    updateTDKSection(tdkSection: TDKSection): Observable<void> {
        return this.http.put<void>(`api/tdkSections/${tdkSection._id}`, tdkSection);
    }
    deleteTDKSection(tdkSection: TDKSection): Observable<void> {
        return this.http.delete<void>(`api/tdkSections/${tdkSection._id}`);
    }
}