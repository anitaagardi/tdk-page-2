import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../../../model/Menu';
import { MenuElement } from '../../../model/MenuElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MenuElementService } from '../../../services/menu-element.service';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administrator-menu-element-list',
  templateUrl: './administrator-menu-element-list.component.html',
  styleUrls: ['./administrator-menu-element-list.component.css']
})
export class AdministratorMenuElementListComponent implements OnInit {
  menu: Menu = new Menu();
  menuId: string = "";
  menuElements: MenuElement[] = [];
  displayedColumns: string[] = ['title', 'operations'];
  dataSource = new MatTableDataSource(this.menuElements);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private menuService: MenuService, private menuElementService: MenuElementService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(this.menuElements);
    this.menuId = this.activeRoute.snapshot.queryParams['menuId'];
    this.getMenuElements();
  }
  getMenuElements() {
    this.menuService.getMenuByMenuId(this.menuId)
      .subscribe((menu) => {
        this.menu = menu;
        this.menuElements = this.menu.menuElements.reverse();
        this.dataSource = new MatTableDataSource(this.menuElements);
      }, () => {

      }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteMenuElement(menuElement: MenuElement) {
    let conf = confirm("Biztos, hogy szeretné törölni a menü elemet?");
    if (conf) {
      this.menuElementService.deleteMenuElement(this.menuId, menuElement).subscribe(() => {
        alert("A menü elem törlése sikeres");
        this.getMenuElements();
      }, () => {
        alert("Hiba történt a menü elem törlése során");
        this.getMenuElements();
      }
      );
    }
  }
  modifyMenuElement(menuElement: MenuElement) {
    this.router.navigate(['/menu/menuElement/modify'], {
      queryParams: {
        menuId: this.menuId,
        menuElementId: menuElement._id
      }
    });
  }

}
