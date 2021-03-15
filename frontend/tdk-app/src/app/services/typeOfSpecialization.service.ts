import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Faculty } from '../model/Faculty';
import { TypeOfSpecialization } from '../model/TypeOfSpecialization';
@Injectable()
export class TypeOfSpecializationService {
    constructor(private http: HttpClient) {
    }

    getAllTypeOfSpecialization(): Observable<TypeOfSpecialization[]> {
        return this.http.get<TypeOfSpecialization[]>('api/typeOfSpecializations');
    }
    getTypeOfSpecializationByTypeOfSpecializationId(typeOfSpecializationId: string): Observable<TypeOfSpecialization> {
        return this.http.get<TypeOfSpecialization>(`api/typeOfSpecializations/${typeOfSpecializationId}`);
    }
    addTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization): Observable<void> {
        return this.http.post<void>('api/typeOfSpecializations', typeOfSpecialization);
    }
    updateTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization): Observable<void> {
        return this.http.put<void>(`api/typeOfSpecializations/${typeOfSpecialization._id}`, typeOfSpecialization);
    }
    deleteTypeOfSpecialization(typeOfSpecialization: TypeOfSpecialization): Observable<void> {
        return this.http.delete<void>(`api/typeOfSpecializations/${typeOfSpecialization._id}`);
    }
}