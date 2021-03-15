import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Menu } from '../../../model/Menu';
import { visibilities } from '../../../model/Visibilities';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-administrator-menu-create',
  templateUrl: './administrator-menu-create.component.html',
  styleUrls: ['./administrator-menu-create.component.css']
})
export class AdministratorMenuCreateComponent implements OnInit {
  constructor(private menuService: MenuService) { }
  menu: Menu = new Menu();
  visibilities: string[] = visibilities;
  @ViewChild('createMenuForm', { static: false, read: ElementRef }) createMenuForm: ElementRef;
  ngOnInit() {
    this.menu.visible = visibilities[0];
  }
  addMenu() {
    let conf = confirm("Biztos, hogy szeretné felvinni a menüt?");
    if (conf) {
      if (this.menu.position < 1) {
        alert("A menü pozíciója 1-nél nem lehet kisebb");
        return;
      }

      this.menu.date = new Date();
      this.menu.menuElements = [];
      this.menuService.addMenu(this.menu).subscribe(() => {
        alert("A menü felvitele sikeres");
        this.createMenuForm.nativeElement.reset();
        this.menu = new Menu();
        this.menu.visible = visibilities[0];
      }, () => {
        alert("Hiba történt a menü felvietel során");
      }
      );
    }
  }


}
