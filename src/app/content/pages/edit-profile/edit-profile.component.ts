import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../service/users/users.service";
import {MembershipsService} from "../../service/memberships/memberships.service";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidators} from "../../service/validators/validators.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {DialogDeleteAccountComponent} from "../../components/dialog-delete-account/dialog-delete-account.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogSuccessfullyChangeComponent
} from "../../components/dialog-successfully-change/dialog-successfully-change.component";

import {
  DialogChangeProfileComponent
} from "../../../public/components/dialog-change-profile/dialog-change-profile.component";
import {
  DialogCancelMembershipComponent
} from "../../components/dialog-cancel-membership/dialog-cancel-membership.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatFormField,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatLabel,
    MatCardSubtitle,
    NgForOf,
    MatCardFooter,
    NgStyle
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  editProfileForm: FormGroup;
  isNameLoaded = false;
  isImageLoaded = false;
  changePasswordForm: FormGroup;
  changePassword=false;
  submitted = false;
  currentPasswordInvalid = false;
  changePasswordError: string | null = null;
  changePasswordSuccess: string | null = null;
  membership:  any = {};
  permittedCancelPlan = false;

  constructor(private fb: FormBuilder, private userService: UsersService, private membershipService: MembershipsService, private router: Router, private dialog: MatDialog,) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, CustomValidators.validEmail]],
      phoneNumber: ['', [Validators.required, CustomValidators.onlyNumbers, Validators.minLength(9), Validators.maxLength(9)]]
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = Number(localStorage.getItem('id'));
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
      const img = new Image();
      img.src = this.user.profilePicture;
      img.onload = () => {
        this.isImageLoaded = true;
      };

      this.isNameLoaded = true;

      this.editProfileForm.patchValue({
        name: this.user.name,
        username: this.user.username,
        phoneNumber: this.user.phoneNumber,
        profilePicture: this.user.profilePicture
      });

      this.getMembershipCurrent();
    });
  }


  getMembershipCurrent() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.membershipService.getUserMembership(userId).subscribe((data) => {
        this.membership = {
          id: data.id,
          name: data.plan.name,
          price: data.plan.price
        };
        this.permittedCancelPlan = data.plan.id != 1;
      });
    }
  }

  cancelSubscription(): void {
    const ref = this.dialog.open(DialogCancelMembershipComponent, {
      disableClose: true
    });
    ref.afterClosed().subscribe(result => {
      if (result !== 'confirm' || !this.user) return;
      this.membershipService
        .createSubscription({ userId: this.user.id, planId: 1, state: 'Activo' })
        .subscribe(() => this.getMembershipCurrent());
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProfileForm.valid) {
      const userId = Number(localStorage.getItem('id'));

      const updateData = {
        id: userId,
        name: this.editProfileForm.value.name,
        username: this.editProfileForm.value.username,
        phoneNumber: this.editProfileForm.value.phoneNumber,
        profilePicture: this.user.profilePicture,
      };

      this.userService.putUser(userId.toString(), updateData).subscribe(() => {
        const dialogRef = this.dialog.open(DialogSuccessfullyChangeComponent);
        dialogRef.afterClosed().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }

  changePasswordButton() {
    this.changePassword = true;
  }

  validateCurrentPassword() {
    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    if (currentPassword !== this.user.password) {
      this.currentPasswordInvalid = true;
      this.changePasswordForm.get('currentPassword')?.setErrors({ incorrect: true });
    } else {
      this.currentPasswordInvalid = false;
      this.changePasswordForm.get('currentPassword')?.setErrors(null);
    }
  }

  onChangePassword() {
    this.submitted = true;
    this.changePasswordError = null;
    this.changePasswordSuccess = null;

    if (this.changePasswordForm.valid) {
      const userId = String(localStorage.getItem('id'));
      const newPassword = this.changePasswordForm.value.newPassword;

      const ChangePassword = {
        name: this.user.name,
        password: newPassword,
        username: this.user.username,
        phoneNumber: this.user.phoneNumber,
        profilePicture: this.user.profilePicture,
        membershipId: this.user.membership
      };

      console.log(ChangePassword)
      this.userService.changePassword(Number(userId), ChangePassword).subscribe(() => {
        const dialogRef = this.dialog.open(DialogSuccessfullyChangeComponent);
        dialogRef.afterClosed().subscribe(() => {
          window.location.reload();
        });
      });
    } else {
      if (this.changePasswordForm.controls['currentPassword'].invalid) { this.changePasswordForm.controls['currentPassword'].markAsTouched(); }
      if (this.changePasswordForm.controls['newPassword'].invalid) { this.changePasswordForm.controls['newPassword'].markAsTouched(); }
    }
  }

  closeSession() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

  forgotPassword() {
    localStorage.removeItem('id');
    this.router.navigateByUrl('/verify-email').then(() => {
      window.location.reload();
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DialogDeleteAccountComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        const userId = String(localStorage.getItem('id'));
        this.userService.deleteUser(userId).subscribe(() => {
          localStorage.removeItem('id');
          this.router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  changeImage() {
    const userId = String(localStorage.getItem('id'));
    const dialogRef = this.dialog.open(DialogChangeProfileComponent, {
      data: userId,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
