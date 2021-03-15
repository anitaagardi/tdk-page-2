import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from '../model/Menu';
import { MenuService } from './menu.service';
@Injectable({
    providedIn: 'root'
})
export class MenuResolverService implements Resolve<Menu[]> {
    constructor(private menuService: MenuService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Menu[]> | Observable<never> {
        return this.menuService.getAllMenu().pipe();
    }
}