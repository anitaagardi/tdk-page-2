import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { visibilities } from '../../../model/Visibilities';
import { WYSIWYGConfig } from '../../../model/WYSIWYG';
import { MenuElement } from '../../../model/MenuElement';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuElementService } from '../../../services/menu-element.service';
@Component({
  selector: 'app-administrator-menu-element-modify',
  templateUrl: './administrator-menu-element-modify.component.html',
  styleUrls: ['./administrator-menu-element-modify.component.css']
})
export class AdministratorMenuElementModifyComponent implements OnInit {
  menuId: string = "";
  menuElementId: string = '';
  menuElement: MenuElement = new MenuElement();
  //checkbox
  visibilities: string[] = visibilities;
  //WYSIWYG
  config = WYSIWYGConfig;
  //visibility;
  @ViewChild('menuElementCreateForm', { static: false, read: ElementRef }) menuElementCreateForm: ElementRef;
  constructor(private menuElementService: MenuElementService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.menuId = this.activeRoute.snapshot.queryParams['menuId'];
    this.menuElementId = this.activeRoute.snapshot.queryParams['menuElementId'];
    this.getMenuElement();
  }
  getMenuElement() {
    this.menuElementService.getMenuElement(this.menuId, this.menuElementId).subscribe((menuElement) => {
      this.menuElement = menuElement;
    }, () => {

    }
    );
  }

  modifyMenuElement() {

    let conf = confirm("Biztos, hogy szeretné felvinni a menü elemet?");
    if (conf) {
      this.menuElementService.updateMenuElement(this.menuId, this.menuElement).subscribe(() => {
        alert("A menü elem módosítása sikeres");

        this.router.navigate(['/menu/menuElement/list'], {
          queryParams: {
            menuId: this.menuId
          }
        });
      },
        () => {
          alert("Hiba történt a menü elem módosítása során");
          this.router.navigate(['/menu/menuElement/list'], {
            queryParams: {
              menuId: this.menuId
            }
          });
        }
      );
    }

  }


}
