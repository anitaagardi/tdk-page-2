import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Permission } from '../../../model/Permissions';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-administrator-users',
  templateUrl: './administrator-users.component.html',
  styleUrls: ['./administrator-users.component.css']
})
export class AdministratorUsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['permissionSetting', 'permission', 'name', 'email', 'registrationDate', 'delete'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getAllUser().subscribe(users => {
      this.users = users.reverse();
      this.dataSource = new MatTableDataSource(this.users);
    }, () => {

    }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setToAdmin(user: User) {
    let conf = confirm("Biztos, hogy módosítani szeretné a felhasználót?");
    if (conf) {
      user.permission = Permission.ADMIN;
      this.userService.updateUser(user).subscribe(() => {
        alert("A felhasználó módosítása sikeres");
        this.getUsers();
      }, () => {
        alert("Hiba történt a felhasználó módosítása során");
        this.getUsers();
      }
      );
    }
  }
  setToFacultyAdmin(user: User) {
    let conf = confirm("Biztos, hogy módosítani szeretné a felhasználót?");
    if (conf) {
      user.permission = Permission.FACULTYADMIN;
      this.userService.updateUser(user).subscribe(() => {
        alert("A felhasználó módosítása sikeres");
        this.getUsers();
      }, () => {
        alert("Hiba történt a felhasználó módosítása során");
        this.getUsers();
      }
      );
    }
  }
  setToUser(user: User) {
    let conf = confirm("Biztos, hogy módosítani szeretné a felhasználót?");
    if (conf) {
      user.permission = Permission.USER;
      this.userService.updateUser(user).subscribe(() => {
        alert("A felhasználó módosítása sikeres");
        this.getUsers();
      }, () => {
        alert("Hiba történt a felhasználó módosítása során");
        this.getUsers();
      }
      );
    }
  }
  deleteUser(user: User) {
    let conf = confirm("Biztos, hogy törölni szeretné a felhasználót?");
    if (conf) {
      this.userService.deleteUser(user).subscribe(() => {
        alert("A felhasználó törlése sikeres");
        this.getUsers();
      }, () => {
        alert("Hiba történt a felhasználó törlése során");
        this.getUsers();
      }
      );
    }
  }
}
