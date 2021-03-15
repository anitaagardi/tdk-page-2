import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Menu } from '../../../model/Menu';
import { MenuService } from '../../../services/menu.service';
import { Router } from '@angular/router';
import { visibilities } from '../../../model/Visibilities';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
export interface PeriodicElement {
  name: string;
  visibility: number;
  position: number;
  operations: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Title1', visibility: 1, position: 1, operations: '' },
];
@Component({
  selector: 'app-administrator-menu-edit',
  templateUrl: './administrator-menu-edit.component.html',
  styleUrls: ['./administrator-menu-edit.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AdministratorMenuEditComponent implements OnInit {
  menus: Menu[] = [];
  visibilities = visibilities;
  displayedColumns: string[] = ['name', 'visibility', 'position', 'operations'];
  dataSource = new MatTableDataSource(this.menus);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private menuService: MenuService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getMenus();
  }

  getMenus() {

    this.menuService.getAllMenu().subscribe(menus => {
      this.menus = menus.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.menus);
    }, () => {

    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateMenu(menu: Menu) {
    let conf = confirm("Biztos, hogy szeretné módosítani a menüt?");
    if (conf) {
      this.menuService.updateMenu(menu).subscribe(() => {
        alert("A menü módosítása sikeres");
        this.router.navigateByUrl(this.location.path());
      }, () => {
        alert("Hiba történt a menü módosítása során");
        this.getMenus();
      }
      );
    }

  }
  deleteMenu(menu) {
    let conf = confirm("Biztos, hogy szeretné törölni a menüt?");
    if (conf) {
      this.menuService.deleteMenu(menu).subscribe(() => {
        alert("A menü törlése sikeres");
        this.getMenus();
      }, () => {
        alert("Hiba történt a menü törlése során");
        this.getMenus();
      }

      );
    }

  }
  listMenuElements(menu) {
    this.router.navigate(['/menu/menuElement/list'], {
      queryParams: {
        menuId: menu._id
      }
    });
  }
  addMenuElement(menu) {
    this.router.navigate(['/menu/menuElement/create'], {
      queryParams: {
        menuId: menu._id
      }
    });
  }
}
