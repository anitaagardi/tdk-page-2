import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserChangePassword } from '../model/UserChangePassword';

@Injectable()
export class UserService {
    users: User[] = [];
    constructor(private http: HttpClient) {

    }
    getActualUser(): User {
        return this.users[this.users.length - 1];
    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>('api/users');
    }

    addUser(user: User, language: string): Observable<void> {
        return this.http.post<void>(`api/users/${language}`, user);
    }
    updateUser(user: User): Observable<void> {
        return this.http.put<void>(`api/users/${user._id}`, user);
    }
    getLoggedInUser(userId: string): Observable<User> {
        return this.http.get<User>(`api/users/${userId}`);
    }
    createNewPassword(user: User, language: string): Observable<void> {
        return this.http.post<void>(`api/forgottenPasswordEmail/${language}`, user);
    }
    changePassword(userChangePassword: UserChangePassword, language: string): Observable<void> {
        return this.http.post<void>(`api/changePassword/${language}`, userChangePassword);
    }
    deleteUser(user: User): Observable<void> {
        return this.http.delete<void>(`api/users/${user._id}`);
    }


}



