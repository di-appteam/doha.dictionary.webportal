import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountData } from '../../models/account';
import {TranslateModule} from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login-section',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule ,
    ReactiveFormsModule],
  templateUrl: './login-section.component.html',
  styleUrl: './login-section.component.scss'
})
export class LoginSectionComponent implements OnInit {
  accountData: AccountData = {email : '',password:''};
  loginFormGroup!:FormGroup;
  constructor() { }

  ngOnInit() {
    this.loginFormGroup=new FormGroup({
      'email':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required])
    });
  }

  logIn(): void {

  }

  openModalWithComponent() {

  }
  openForgetPasswordModal() {

  }

}
