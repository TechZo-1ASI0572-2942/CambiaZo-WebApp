import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { MembershipsService } from "../../service/memberships/memberships.service";
import { Memberships } from "../../model/memberships/memberships.model";
import { UsersService } from "../../service/users/users.service";
import { DialogLoginRegisterComponent } from "../../../public/components/dialog-login-register/dialog-login-register.component";
import { MatDialog } from "@angular/material/dialog";
import {Router, RouterLink} from '@angular/router';
import {forkJoin, throwIfEmpty} from "rxjs";
import { Users } from "../../model/users/users.model";
import {DialogPaypalComponent} from "../../components/dialog-paypal/dialog-paypal.component";

declare var paypal: any;

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})

export class MembershipsComponent implements OnInit {

  memberships: Memberships[] = [];
  membershipCurrent: any = null;
  user: Users | null = null;
  isLoggedIn: boolean = false;
  showPayPalFor: string | null = null;
  dataLoaded: boolean = false;
  loading: boolean = true;

  constructor(
    private membershipsService: MembershipsService,
    private userService: UsersService,
    private dialogLoginRegister: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isLogged;
    this.getUser();
    this.loadMemberships();
  }

  getMembershipCurrent(){
    const userId = localStorage.getItem('id');
    if (userId) {
      this.membershipsService.getUserMembership(userId).subscribe((data) => {
        this.membershipCurrent = data;
      });
    }
  }

  getUser() {
    const userId = Number(localStorage.getItem('id'))||null;
    if (userId) {
      this.userService.getUserById(userId).subscribe((data) => {
        this.user = data;
        this.getMembershipCurrent()
      });
    }
  }

  loadMemberships(): void {
    this.membershipsService.getMemberships().subscribe(
      (memberships) => {
        this.memberships = memberships;
      },
      (error) => {
        console.error('Error loading memberships:', error);
      }
    );
  }



  onBuyPlan(membershipId: string) {
    if (!this.isLoggedIn) {
      this.dialogLoginRegister.open(DialogLoginRegisterComponent, { disableClose: true });
    } else {
      const selected = this.memberships.find(m => m.id === parseInt(membershipId));
      if (!selected || !this.user) return;

      const subscription = this.membershipCurrent;

      this.dialogLoginRegister.open(DialogPaypalComponent, {
        data: {
          id: selected.id,
          name: selected.name,
          price: selected.price,
          planId: selected.id,
          userId: this.user.id,
          subscriptionId: subscription.id
        },
        width: '400px',
        disableClose: false
      }).afterClosed().subscribe(success => {
        if (success) {
          this.getMembershipCurrent();
        }
      });
    }
  }

  protected readonly throwIfEmpty = throwIfEmpty;
  protected readonly parseInt = parseInt;
}
