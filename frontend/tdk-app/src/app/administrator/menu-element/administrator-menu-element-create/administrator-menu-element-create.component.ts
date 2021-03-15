import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { visibilities } from '../../../model/Visibilities';
import { WYSIWYGConfig } from '../../../model/WYSIWYG';
import { MenuElement } from '../../../model/MenuElement';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuElementService } from '../../../services/menu-element.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY.MM.DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-administrator-menu-element-create',
  templateUrl: './administrator-menu-element-create.component.html',
  styleUrls: ['./administrator-menu-element-create.component.css']
})

export class AdministratorMenuElementCreateComponent implements OnInit {

  menuId: string = "";
  menuElement: MenuElement = new MenuElement();
  //checkbox
  visibilities: string[] = visibilities;
  //WYSIWYG
  config = WYSIWYGConfig;
  //visibility;
  @ViewChild('menuElementCreateForm', { static: false, read: ElementRef }) menuElementCreateForm: ElementRef;
  constructor(private menuElementService: MenuElementService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.menuElement.visible = visibilities[0];
    this.menuElement.date = new Date();
    this.menuId = this.activeRoute.snapshot.queryParams['menuId'];
  }

  addMenuElement() {

    let conf = confirm("Biztos, hogy szeretné felvinni a menü elemet?");
    if (conf) {
      this.menuElement._id = this.mongoObjectId();

      this.menuElementService.addMenuElement(this.menuId, this.menuElement).subscribe(() => {
        alert("A menü elem felvitele sikeres");

        this.router.navigate(['/menu/menuElement/list'], {
          queryParams: {
            menuId: this.menuId
          }
        });
      });
    }

  }
  mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }


}
