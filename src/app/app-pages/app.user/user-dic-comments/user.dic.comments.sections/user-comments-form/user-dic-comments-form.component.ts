import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { CustomResponse, ResponseCode } from '../../../../../app-models/user-account.model';
import { AccountService } from '../../../../../app-shared/services/account.service';
import { SharedConfiguration, NoWhitespaceValidator } from '../../../../../app-shared/services/config.service';
import { SharedService } from '../../../../../app-shared/services/shared.service';
import { ShowMessageServiceService } from '../../../../../app-shared/services/showing-message.service';

@Component({
  selector: 'user-dic-comments-form',
  standalone: true,
  imports: [CommonModule,RecaptchaModule,TranslateModule,ReactiveFormsModule,FormsModule
    ,RouterModule],
  templateUrl: './user-dic-comments-form.component.html',
  styleUrls: ['./user-dic-comments-form.component.scss']
})
export class UserDicCommentsFormComponent implements OnInit {


  sendDicComment!: FormGroup;
  loading = false;
  submitted = false;
  isSent = false;
  messageBody: string = "";
  isValidCaptcha: any = false;
  captchaResponse: any;
  captchaMessage: string = "";
  constructor(private formBuilder: FormBuilder, private _showMessageServiceService: ShowMessageServiceService, private _config: SharedConfiguration, private sharedService: SharedService, private accountService: AccountService) { }

  ngOnInit() {
    this.prepareForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.sendDicComment.controls;
  }

  ngAfterViewInit(): void {
  }

  prepareForm() {
    this.loading = false;
    this.submitted = false;
    var email_str = "";
    if (this._config.userInfo)
      email_str = this._config.userInfo.Email;
    this.sendDicComment = this.formBuilder.group({
      Email: [email_str, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), NoWhitespaceValidator.cannotContainSpace]],
      Name: ["", [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Citation: ["", [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Comment: ["", [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      LemmaValue: ["", [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      Reference: ["", [Validators.required, NoWhitespaceValidator.cannotContainSpace]],
      CitationDate: ["", []],
      Description: ["", []],
      GeneralNote: ["", []],
      RootValue: ["", []],
      AutherName: ["", []],
      errorincollect: [false, []]
    });
  }


  resolved(captchaResponse: any) {
    this.captchaResponse = captchaResponse;
    this.sharedService.ValidateRecaptcha(this.captchaResponse).subscribe(item => this.isValidCaptcha = item);
    this.captchaMessage = "";
  }
  resetCaptcha() {
    this.isValidCaptcha = false;
    this.captchaResponse = "";
    this.captchaMessage = "";
  }
  public ondsafasdfdsfagfSubmit() {

    this.submitted = true;
    if (!this.captchaResponse)
      this.captchaMessage = "يرجى تأكيد أنك لست روبوتًا.";
    if (this.sendDicComment.valid == false || this.isValidCaptcha == false) {
      return;
    }

    this.loading = true;
    return this.accountService.SendDictionaryComment(this.sendDicComment.value).subscribe(
      item => [this.PrepareResponse(item)],
      error => {
        this.loading = false;
        //handling error message
      }


    );
  }


  PrepareResponse(response: CustomResponse) {
    this.loading = false;
    this.resetCaptcha();
    if (response.ResponseCode == ResponseCode.Ok) {
      this.prepareForm();
      this.isSent = true;
    }
    setTimeout(() => { this.isSent = false }, 4000);
    /////////// Reset Captcha ////////////
    if (response.ResponseCode != ResponseCode.Ok) {
      this._showMessageServiceService.ShowErrorMessage(response.ResponseCode);
      return;
    }
  }

}
