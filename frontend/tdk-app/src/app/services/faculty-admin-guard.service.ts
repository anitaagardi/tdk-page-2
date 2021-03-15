import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class FacultyAdminGuardService implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {
        if (!this.authenticationService.getActualUserId()) {
            return false;
        }
        if (this.authenticationService.getActualUserPermission() == "kari admin") {
            return true;
        }
        if (this.authenticationService.getActualUserPermission() == "admin") {
            return true;
        }

        return false;
    }
}
