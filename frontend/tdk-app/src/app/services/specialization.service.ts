import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Specialization } from '../model/Specialization';
@Injectable()
export class SpecializationService {
    constructor(private http: HttpClient) {
    }

    getAllSpecialization(): Observable<Specialization[]> {
        return this.http.get<Specialization[]>('api/specializations');
    }
    getSpecializationBySpecializationId(specializationId: string): Observable<Specialization> {
        return this.http.get<Specialization>(`api/specializations/${specializationId}`);
    }
    getSpecializationByFacultyIdAndTypeOfSpecializationId(facultyId: string, typeOfSpecializationId: string): Observable<Specialization> {
        return this.http.get<Specialization>(`api/faculties/${facultyId}/typeOfSpecializations/${typeOfSpecializationId}/specializations`);
    }
    addSpecialization(specialization: Specialization): Observable<void> {
        return this.http.post<void>('api/specializations', specialization);
    }
    updateSpecialization(specialization: Specialization): Observable<void> {
        return this.http.put<void>(`api/specializations/${specialization._id}`, specialization);
    }
    deleteSpecialization(specialization: Specialization): Observable<void> {
        return this.http.delete<void>(`api/specializations/${specialization._id}`);
    }
}