import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject } from "@angular/core";
import { User } from "../../../model/User";
import { Permission } from "../../../model/Permissions";
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.css"],
})
export class UserRegistrationComponent implements OnInit {
  user: User = new User();
  name: string = '';
  email1: string = '';
  email2: string = '';
  password1: string = '';
  password2: string = '';
  @ViewChild("registrationForm", { static: false, read: ElementRef })
  registrationForm: ElementRef;
  constructor(@Inject(LOCALE_ID) public locale: string, private userService: UserService, private router: Router) { }

  ngOnInit() { }
  resetValues() {
    this.name = "";
    this.user = new User();
    this.email1 = "";
    this.email2 = "";
    this.password1 = "";
    this.password2 = "";
  }
  registration() {
    let error = false;
    if (this.email1 != this.email2) {
      if (this.locale == "en") {
        alert("The two email addresses you entered do not match");
      } else {
        alert("A megadott két email cím nem egyezik");
      }
      error = true;
    }
    if (this.password1 != this.password2) {
      if (this.locale == "en") {
        alert("The two passwords you entered do not match");
      } else {
        alert("A megadott két jelszó nem egyezik");
      }
      error = true;
    }
    if (!error) {
      let conf;
      if (this.locale == "en") {
        conf = confirm("Are you sure you want to register?");
      } else {
        conf = confirm("Biztos, hogy szeretnél regisztrálni?");
      }
      if (conf) {
        this.user.name = this.name;
        this.user.email = this.email1;
        this.user.password = this.password1;
        this.user.permission = Permission.USER;
        this.user.registrationDate = new Date();
        this.userService.addUser(this.user, this.locale).subscribe(
          () => {
            if (this.locale == "en") {
              alert("Registration is successful");
            } else {
              alert("A regisztráció sikeres");
            }
            this.resetValues();
            this.registrationForm.nativeElement.reset();
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          },
          () => {
            if (this.locale == "en") {
              alert("Registration is not successful");
            } else {
              alert("A regisztráció sikertelen");
            }
            this.resetValues();
            this.registrationForm.nativeElement.reset();
          }
        );
      }
    }
  }
}
