import { Component, OnInit, ViewChild, ElementRef, LOCALE_ID, Inject } from '@angular/core';
import { User } from '../../../model/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  @ViewChild('userLoginForm', { static: false, read: ElementRef }) userLoginForm: ElementRef;
  constructor(@Inject(LOCALE_ID) public locale: string, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let conf;
    if (this.locale == "en") {
      conf = confirm("Are you sure you want to log in?");
    } else {
      conf = confirm("Biztos, hogy szeretne bejelentkezni?");
    }
    if (conf) {
      this.authenticationService.login(this.user.email, this.user.password).subscribe(() => {
        if (this.locale == "en") {
          alert("Login successful!");
        } else {
          alert('Sikeres bejelentkezés!');
        }
        if (this.authenticationService.getActualUserPermission() != "felhasználó") {
          this.router.navigate(['conference/list']).then(() => {
            //window.location.reload();
          });
        } else {
          this.router.navigate(['/']).then(() => {
            //window.location.reload();
          });
        }

      }, () => {
        if (this.locale == "en") {
          alert("Login failed!'");
        } else {
          alert('Sikertelen bejelentkezés!');
        }
      }, () => {
        this.user = new User();
        this.userLoginForm.nativeElement.reset();
      });
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {

    });
  }
}
