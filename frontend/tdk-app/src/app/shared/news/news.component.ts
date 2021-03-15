import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/Menu';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { MenuElement } from '../../model/MenuElement';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  menu: Menu;
  menuId: string = '';
  menuElements: MenuElement[] = [];
  constructor(private menuService: MenuService, private activeRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.menuId = this.activeRoute.snapshot.queryParams['menuId'];
    this.getMenus();

  }

  getMenus() {
    this.menuService.getMenuByMenuId(this.menuId)
      .subscribe((menu) => {
        this.menu = menu;
        this.menuElements = this.menu.menuElements;
      }, () => {

      }
      );
  }

}
