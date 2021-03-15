import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhotoGallery } from '../model/PhotoGallery';
@Injectable()
export class PhotoGalleryService {
    photoGalleries: PhotoGallery[] = [];
    constructor(private http: HttpClient) {
    }

    getAllPhotoGalleries(): Observable<PhotoGallery[]> {
        return this.http.get<PhotoGallery[]>('api/photoGalleries');
    }
    getPhotoGalleryByPhotoGalleryId(photoGalleryId: string): Observable<PhotoGallery> {
        return this.http.get<PhotoGallery>(`api/photoGalleries/${photoGalleryId}`);
    }
    addPhotoGallery(photoGallery: PhotoGallery): Observable<void> {
        return this.http.post<void>('api/photoGalleries', photoGallery);
    }
    updatePhotoGallery(photoGallery: PhotoGallery): Observable<void> {
        return this.http.put<void>(`api/photoGalleries/${photoGallery._id}`, photoGallery);
    }
    deletePhotoGallery(photoGallery: PhotoGallery): Observable<void> {
        return this.http.delete<void>(`api/photoGalleries/${photoGallery._id}`);
    }

}