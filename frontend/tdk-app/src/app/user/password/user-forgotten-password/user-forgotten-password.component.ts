import { Component, OnInit, ViewChild, ElementRef, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-user-forgotten-password',
  templateUrl: './user-forgotten-password.component.html',
  styleUrls: ['./user-forgotten-password.component.css']
})
export class UserForgottenPasswordComponent implements OnInit {
  user: User = new User();
  @ViewChild('forgottenPasswordForm', { static: false, read: ElementRef }) forgottenPasswordForm: ElementRef;
  constructor(@Inject(LOCALE_ID) public locale: string, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  getNewPassword() {
    let conf;
    if (this.locale == "en") {
      conf = confirm("Are you sure you want to request a new password?");
    } else {
      conf = confirm("Biztos, hogy új jelszót szeretnél kérni?");
    }
    if (conf) {
      this.userService.createNewPassword(this.user, this.locale).subscribe(() => {
        if (this.locale == "en") {
          alert("New password generated successfully, message sent to your email address");
        } else {
          alert("Az új jelszó generálása sikeres, az üzenetet elküldtük az email címedre");
        }
        this.user = new User();
        this.forgottenPasswordForm.nativeElement.reset();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }, () => {
        if (this.locale == "en") {
          alert("An error occurred while requesting a new password");
        } else {
          alert("Hiba történt az új jelszó kérése során");
        }
        this.user = new User();
        this.forgottenPasswordForm.nativeElement.reset();
      }
      );
    }
  }
}
