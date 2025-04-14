import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterContent2Component} from "../../../public/footer-content-2/footer-content-2.component";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {RouterLinkActive} from "@angular/router";
import {DialogRegisterSuccessfullyComponent} from "../../components/dialog-register-successfully/dialog-register-successfully.component";
import {MatDialog} from "@angular/material/dialog";
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../service/validators/validators.service';
import {NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import { UsersService } from "../../service/users/users.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    FooterContent2Component,
    MatLabel,
    MatButtonModule,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatFormField,
    MatIcon,
    MatInput,
    MatSuffix
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  hiderepeat = true;
  submitted = false;

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, CustomValidators.validEmail]],
    tel: [
      '',
      [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
        CustomValidators.onlyNumbers,
      ],
    ],
    contrasenia: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
      ],
    ],
    confirmacionContrasenia: ['', Validators.required],
  }, {
    validators: CustomValidators.mustBeEqual('contrasenia', 'confirmacionContrasenia'),
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private usersService: UsersService
  ) {}

  hide1(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  hide2(event: MouseEvent) {
    this.hiderepeat = !this.hiderepeat;
    event.stopPropagation();
  }

  register(){
    this.dialog.open(DialogRegisterSuccessfullyComponent, {
    });
  }

  addUser() {
    if (this.registerForm.valid) {
      const newUser = {
        username: this.registerForm.value.email,
        password: this.registerForm.value.contrasenia,
        name: this.registerForm.value.name,
        phoneNumber: this.registerForm.value.tel,
        profilePicture: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        isGoogleAccount: false,
        roles: ["ROLE_USER"]
      };


      this.usersService.register(newUser).subscribe(
        response => {
          this.register();
        },
        error => {
          console.error('Error registering user:', error);
        }
      );

      window.location.href = '/login';
    } else {
    }
  }
}
