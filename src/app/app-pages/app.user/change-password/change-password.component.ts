import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ChangePasswordModel, CustomResponse, ResponseCode } from '../../../app-models/user-account.model';
import { BaseComponent } from '../../../app-shared/security/base.component';
import { AccountService } from '../../../app-shared/services/account.service';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { ShowMessageServiceService } from '../../../app-shared/services/showing-message.service';
import { PasswordValidation } from '../../../app-shared/validation/password-validation';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,TranslateModule,ReactiveFormsModule,FormsModule
    ,RouterModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {

  public changePassword!: ChangePasswordModel;
  public changePasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  passwordAlreadyExist: boolean = false;
  InvalidOldPassword: boolean = false;

  constructor(
    private meta : Meta,private _showMessageServiceService: ShowMessageServiceService, private _accountService: AccountService
    , private formBuilder: FormBuilder, public override _router: Router,
    public override _config: SharedConfiguration) {
    super(_router,_config);
    this.meta.updateTag({name: 'title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'معجم الدوحة التاريخي للغة العربية'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'معجم الدوحة التاريخي للغة العربية معجم يسجل تاريخ استعمالات ألفاظ اللغة العربية بدلالاتها الأولى، وتاريخ تحولاتها البنيوية والدلالية، مع تحديد مستعمليها، وتعزيز ذلك بالشواهد الموثقة.'},"name='twitter:description'");

    this.meta.updateTag({name: 'url',content: window.location.href},"name='url'");
    this.meta.updateTag({name: 'og:url',content: window.location.href},"name='og:url'");
    this.meta.updateTag({name: 'twitter:url',content: window.location.href},"name='twitter:url'");
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(8), PasswordValidation.Strong]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  onCancel() {
    this._router.navigate(['/profile/']);
  }

  onSubmit() {
    this.submitted = true;
    this.passwordAlreadyExist = false;
    this.InvalidOldPassword = false;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this._accountService.ChangePassword(this.changePasswordForm.value).pipe(first()).subscribe(
      item => [this.PrepareResponse(item)],
      error => {
        this.loading = false;
        //handling error message
      });
  }

  PrepareResponse(response: CustomResponse) {
    this.loading = false;
    if (response.ResponseCode == ResponseCode.PasswordAlreadyExist) {
      this.passwordAlreadyExist = true;
      return;
    }
    else if (response.ResponseCode == ResponseCode.InValidPassword) {
      this.InvalidOldPassword = true;
      return;
    }
    else if (response.ResponseCode != ResponseCode.Ok) {
      this._showMessageServiceService.ShowErrorMessage(response.ResponseCode);
      return;
    }
    this.onCancel();
  }
  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }


}
