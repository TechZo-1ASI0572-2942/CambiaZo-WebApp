import { Component, OnInit } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {UsersService} from "../../service/users/users.service";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.css'
})
export class HeaderProfileComponent implements OnInit{
  user : any = {};
  constructor(private userService:UsersService, private router: Router) {}
  ngOnInit(){
    this.getUser();
  }
  getUser(){
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data)=>{
      this.user = data;
    });
  }

  closeSession() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

  logout(){
    this.userService.isLogged = false;
    localStorage.removeItem('id');
  }
}
