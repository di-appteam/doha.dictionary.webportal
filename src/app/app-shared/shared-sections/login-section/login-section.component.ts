import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { CustomResponse, ResponseCode } from '../../../app-models/security.model';
import { SecurityService } from '../../services/security.service';
import { ShowMessageServiceService } from '../../services/showing-message.service';
import { SharedConfiguration } from '../../services/config.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouterLink, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from '../../../app-pages/app.user/forget-password/forget-password.component';
import { CreateAccountComponent } from '../../../app-pages/app.user/create-account/create-account.component';
import { AccountData } from '../../../app-models/user-account.model';
import { ConfigJsonService } from '../../services/configjson.service';

@Component({
  selector: 'app-login-section',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule ,RouterModule,
    ReactiveFormsModule,RouterLink],
  templateUrl: './login-section.component.html',
  styleUrl: './login-section.component.scss',
  providers:[ShowMessageServiceService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class LoginSectionComponent implements OnInit {
  accountData: AccountData = {email : '',password:''};
  loginFormGroup!:FormGroup;
  bsModalRef!: BsModalRef;
  constructor(private _showMessageServiceService: ShowMessageServiceService,private modalService: BsModalService,public configJson:ConfigJsonService
    ,public _sharedConfiguration: SharedConfiguration,private _accountService: AccountService,private _securityService: SecurityService) { }

  ngOnInit() {
    this.loginFormGroup=new FormGroup({
      'email':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required])
    });
  }

  logIn(): void {
    if(!this.loginFormGroup.valid)
     return;
    this._accountService.LogIn(this.loginFormGroup.value).subscribe(
      item => [this.PrepareResponse(item)]);
  }

  PrepareResponse(response: CustomResponse) {
    if (response.ResponseCode != ResponseCode.Ok) {
      this._showMessageServiceService.ShowErrorMessage(response.ResponseCode);
      return;
    }
    this._securityService.saveTokenInfo(response.token);
    this.reloadPage();
  }

  logOut(): void {
    this._securityService.clearLoginInfo();
    this._sharedConfiguration.userInfo = undefined;
    window.location.reload();
  }

  reloadPage() {
      window.location.reload();
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(CreateAccountComponent,{class : "modal-sm"});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openForgetPasswordModal() {
    this.bsModalRef = this.modalService.show(ForgetPasswordComponent,{class : "modal-sm"});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
