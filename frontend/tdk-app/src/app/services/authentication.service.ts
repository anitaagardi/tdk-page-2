import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private userId: string = null;
    private userPermission: string = null;
    constructor(private http: HttpClient) {

    }

    login(username: string, password: string): Observable<User> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http.post<User>('api/login', {}, { headers }).pipe(
            map(user => {
                this.userId = user._id;
                this.userPermission = user.permission;
                return user;
            })
        );
    }

    getAuthenticatedUser(): Observable<User> {
        return this.http.post<User>('api/isAuthenticated', {}).pipe(
            map(user => {
                this.userId = user._id;
                this.userPermission = user.permission;
                return user;
            })
        );
    }

    logout(): Observable<void> {
        this.userId = undefined;
        return this.http.post<void>('api/logout', {});
    }

    test() {
        return this.http.post<User>(`api/sample/${this.userId}`, {});
    }

    getActualUserId(): string {
        return this.userId;
    }
    getActualUserPermission(): string {
        return this.userPermission;
    }
}
