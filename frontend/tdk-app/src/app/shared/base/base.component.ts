import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Menu } from '../../model/Menu';
import { MenuService } from '../../services/menu.service';
import { AuthenticationService } from '../../services/authentication.service';
import { visibilities } from '../../model/Visibilities';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EN_URL, HU_URL } from '../../constants';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  HU_URL = HU_URL;
  EN_URL = EN_URL;
  title = 'TDK page';
  menus: Menu[] = [];
  showFiller = false;
  opened: boolean;
  firstMenuId: string = "";
  previousUrl: string = '';
  isLogout: string = '';
  siteLanguage: string = 'English';
  siteLocale: string;
  languageList = [{ code: 'en', label: 'English' }, { code: 'hu', label: 'Magyar' }];
  isNavOpened = false;
  @ViewChild('drawer', { static: true }) drawer: MatDrawer;
  @ViewChild('headerNav', { static: false }) headerNav;
  constructor(@Inject(LOCALE_ID) public locale: string, private authenticationService: AuthenticationService, private menuService: MenuService, private router: Router, private activeRoute: ActivatedRoute,) {
    //this.getPreviousPage();

  }

  ngOnInit() {

    this.isLogout = this.activeRoute.snapshot.queryParams['isLogout'];
    this.getPreviousPage();

  }



  getPreviousPage() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
        this.getAllMenus();
      });
  }
  getAllMenus() {
    this.menuService.getAllMenu().subscribe(menus => {
      this.menus = menus;
      this.menus = this.menus.filter(menu => menu.visible == visibilities[0]);
      this.menus = this.menus.filter(menu => menu.menuElements != undefined);
      this.menus.sort((a, b) => {
        if (a.position < b.position) {
          return -1;
        }
        if (a.position > b.position) {
          return 1;
        }

        return 0;
      });
      //reditect to the first menu element, in case of the main page 
      if (this.previousUrl == "/") {
        this.firstMenuId = this.menus[0]._id;
        if (this.firstMenuId) {
          this.router.navigate(['/news'], {
            queryParams: {
              menuId: this.firstMenuId
            }
          });
        }
      }

    }, () => {

    });
  }
  menuList(menu) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['/news'], {
      queryParams: {
        menuId: menu._id
      }
    });
  }
  changeLocale(languageCode) {
    this.locale = languageCode;
  }
  logout() {
    let conf;
    if (this.locale == "en") {
      conf = confirm("Are you sure you want to log out?");
    } else {
      conf = confirm("Biztos, hogy ki szeretne jelentkezni?");
    }
    if (conf) {
      this.authenticationService.logout().subscribe(() => {
        if (this.locale == "en") {
          alert("Successfully logged out");
        } else {
          alert("Sikeresen kijelentkezett");
        }
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }, () => {
        if (this.locale == "en") {
          alert("Failed to log out");
        } else {
          alert("Nem sikerült kijelentkezni");
        }
      }
      );
    }
  }
  isAdminPermission() {
    if (this.authenticationService.getActualUserPermission() == "admin") {
      return true;
    }
    return false;
  }
  isFacultyAdminPermission() {
    if (this.authenticationService.getActualUserPermission() == "kari admin") {
      return true;
    }
    if (this.authenticationService.getActualUserPermission() == "admin") {
      return true;
    }
    return false;
  }
  isUserPermission() {

    if (this.authenticationService.getActualUserPermission() == "felhasználó") {
      return true;
    }
    if (this.authenticationService.getActualUserPermission() == "kari admin") {
      return true;
    }
    if (this.authenticationService.getActualUserPermission() == "admin") {
      return true;
    }
    return false;
  }
  changeLang(lang: string) {

  }
  openNav() {
    this.isNavOpened = !this.isNavOpened;
    if (this.isNavOpened) {
      this.headerNav.nativeElement.style.display = 'block';
    } else {
      this.headerNav.nativeElement.style.display = 'none';
    }
  }

}

