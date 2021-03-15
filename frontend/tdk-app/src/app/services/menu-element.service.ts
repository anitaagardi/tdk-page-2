import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuElement } from '../model/MenuElement';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MenuElementService {
    menuElements: MenuElement[] = [];
    constructor(private http: HttpClient) {

    }
    getMenuElement(menuId: string, menuElementId: string): Observable<MenuElement> {
        return this.http.get<MenuElement>(`api/menus/${menuId}/menuElements/${menuElementId}`);
    }

    addMenuElement(menuId: string, menuElement: MenuElement): Observable<void> {
        return this.http.post<void>(`api/menus/${menuId}/menuElements`, menuElement);
    }

    deleteMenuElement(menuId: string, menuElement: MenuElement): Observable<void> {
        return this.http.delete<void>(`api/menus/${menuId}/menuElements/${menuElement._id}`);
    }
    updateMenuElement(menuId: string, menuElement: MenuElement): Observable<void> {
        return this.http.put<void>(`api/menus/${menuId}/menuElements/${menuElement._id}`, menuElement);
    }
}