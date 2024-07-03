import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChangePasswordModel, CustomResponse, ResponseCode } from '../user-account.model';
import { PasswordValidation } from '../password-validation';
import { Router } from '@angular/router';
import { ShowingMessageComponent } from '../../shared/showing-message/showing-message.component';
import { AccountService } from '../user-account.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShowMessageServiceService } from '../../shared/showing-message/showing-message.service';
import { SharedConfiguration } from '../../core/shared/sharedConfiguration';
import { BaseComponent } from '../../core/shared/security/base.component';
import { Meta } from '../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit, AfterViewInit {

  public changePassword: ChangePasswordModel;
  public changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  passwordAlreadyExist: boolean = false;
  InvalidOldPassword: boolean = false;

  constructor(
    private meta : Meta,private _showMessageServiceService: ShowMessageServiceService, private _accountService: AccountService
    , private formBuilder: FormBuilder, public _router: Router,
    public _config: SharedConfiguration) {
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
  }
  ngAfterViewInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8), PasswordValidation.Strong]],
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
      this._showMessageServiceService.ShowErrorMessage(response.ResponseCode, null);
      return;
    }
    this.onCancel();
  }
  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }


}
