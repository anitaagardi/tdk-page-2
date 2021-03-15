import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserChangePassword } from '../../../model/UserChangePassword';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  userChangePassword: UserChangePassword = new UserChangePassword();
  @ViewChild('changePasswordForm', { static: false, read: ElementRef }) changePasswordForm: ElementRef;

  constructor(@Inject(LOCALE_ID) public locale: string, private userService: UserService) {
  }

  ngOnInit() {
  }
  save() {
    if (this.userChangePassword.newPassword1 != this.userChangePassword.newPassword2) {
      if (this.locale == "en") {
        alert('The two new passwords do not match');
      } else {
        alert('Hiba! Nem egyezik a két új jelszó');
      }
      return;
    }
    let conf;
    if (this.locale == "en") {
      conf = confirm("Are you sure you want to change the password?");
    } else {
      conf = confirm("Biztos, hogy szeretné módosítani a jelszót?");
    }
    if (conf) {
      this.userService.changePassword(this.userChangePassword, this.locale).subscribe(() => {
        this.userChangePassword = new UserChangePassword();
        if (this.locale == "en") {
          alert('You have successfully changed your password');
        } else {
          alert("Sikeresen megváltoztatta a jelszavát");
        }
        this.userChangePassword = new UserChangePassword();
        this.changePasswordForm.nativeElement.reset();
      }, () => {
        if (this.locale == "en") {
          alert('An error occurred while changing the password');
        } else {
          alert("Hiba történt a jelszó módosítása során");
        }
        this.userChangePassword = new UserChangePassword();
      }
      );
    }
  }

}
