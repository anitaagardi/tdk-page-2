import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Faculty } from '../model/Faculty';
@Injectable()
export class FacultyService {
    faculties: Faculty[] = [];
    constructor(private http: HttpClient) {
    }

    getAllFaculty(): Observable<Faculty[]> {
        return this.http.get<Faculty[]>('api/faculties');
    }
    getFacultyByFacultyId(facultyId: string): Observable<Faculty> {
        return this.http.get<Faculty>(`api/faculties/${facultyId}`);
    }
    addFaculty(faculty: Faculty): Observable<void> {
        return this.http.post<void>('api/faculties', faculty);
    }
    updateFaculty(faculty: Faculty): Observable<void> {
        return this.http.put<void>(`api/faculties/${faculty._id}`, faculty);
    }
    deleteFaculty(faculty: Faculty): Observable<void> {
        return this.http.delete<void>(`api/faculties/${faculty._id}`);
    }
}