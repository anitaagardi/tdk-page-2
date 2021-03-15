import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TDKFile } from '../model/TDKFile';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class TDKFileService {
    tdkFiles: TDKFile[] = [];
    constructor(private http: HttpClient) {

    }

    addTDKFile(tdkFile: TDKFile): Observable<void> {
        return this.http.post<void>('api/tdkFiles', tdkFile);

    }
    getAllTDKFile(): Observable<TDKFile[]> {
        return this.http.get<TDKFile[]>('api/tdkFiles');
    }
    updateTDKFile(tdkFile: TDKFile): Observable<void> {
        return this.http.put<void>(`api/tdkFiles/${tdkFile._id}`, tdkFile);
    }

    downloadTDKFile(fileName: string): Observable<Blob> {
        return this.http.get(`api/tdkFiles/${fileName}`, { responseType: "blob" });
    }
}