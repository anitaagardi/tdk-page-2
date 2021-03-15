import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
export class UserResolverService implements Resolve<User> {
    constructor(private authenticationService: AuthenticationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
        return this.authenticationService.getAuthenticatedUser().pipe(catchError(() => EMPTY));
    }
}