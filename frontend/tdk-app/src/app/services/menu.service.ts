import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../model/Menu';
import { MenuElement } from '../model/MenuElement';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MenuService {
    menus: Menu[] = [];
    menuElements: MenuElement[] = [];
    firstMenuId: string;
    constructor(private http: HttpClient) {
    }

    getAllMenu(): Observable<Menu[]> {
        return this.http.get<Menu[]>('api/menus');
    }
    getMenuByMenuId(menuId: string): Observable<Menu> {
        return this.http.get<Menu>(`api/menus/${menuId}`);
    }
    addMenu(menu: Menu): Observable<void> {
        return this.http.post<void>('api/menus', menu);
    }
    updateMenu(menu: Menu): Observable<void> {
        return this.http.put<void>(`api/menus/${menu._id}`, menu);
    }
    deleteMenu(menu: Menu): Observable<void> {
        return this.http.delete<void>(`api/menus/${menu._id}`);
    }
}