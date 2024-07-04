import { NgIf, NgFor, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ActivateAccountModel, ResponseCode, CustomResponse } from '../../../app-models/user-account.model';
import { AccountService } from '../../../app-shared/services/account.service';
import { SecurityService } from '../../../app-shared/services/security.service';
import { ShowMessageServiceService } from '../../../app-shared/services/showing-message.service';
import { ShowingMessageComponent } from '../../../app-shared/shared-sections/showing-message/showing-message.component';

@Component({
  selector: 'activate-account',
  standalone: true,
  imports: [NgIf,NgFor,NgClass,RouterLink,TranslateModule],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public requestActivated: boolean = false;

  constructor(private meta : Meta,private _route: ActivatedRoute,
    private _accountService: AccountService,private securityService:SecurityService, private _router: Router,
    private showMessageServiceService: ShowMessageServiceService) {
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
     this._route.params.subscribe(
      (params :any) => {
        if (params.email && params.code && this.requestActivated == false) {
          this.requestActivated = true;
          var activateAccount = new ActivateAccountModel(params.email, params.code);
          this.ActivateAccount(activateAccount);
        }
      });
  }


  ActivateAccount(activateData: ActivateAccountModel): void {
    this._accountService.ConfirmUserEmail(activateData).subscribe(
      item => [this.PrepareResponse(activateData,item)]);
  }


  ResendActivationCode(activateData: ActivateAccountModel): void {
    this._accountService.ResendActivationCode(activateData).subscribe(
      data => {
        if (data.ResponseCode != ResponseCode.Ok) {
          return this.errorInResponse(activateData,data);
        }
        const initialState = {
          messageType: 5
        };
        this.showMessageServiceService.openModalWithComponent(ShowingMessageComponent, { initialState });
        this._router.navigate(["/"]);
      },
      error => {

        //handling error message
      });
  }

  PrepareResendResponse(activateData: ActivateAccountModel,response: CustomResponse) {
    if (response.ResponseCode != ResponseCode.Ok)
      return this.errorInResponse(activateData,response);
    this.requestActivated = false;
    this.clearParam();
  }
  PrepareResponse(activateData: ActivateAccountModel,response: CustomResponse) {

    if (response.ResponseCode != ResponseCode.Ok)
      return this.errorInResponse(activateData,response);
    this.requestActivated = false;
    this.securityService.saveTokenInfo(response.token);
    this.clearParam();
  }

  clearParam() {
    this._router.navigate(["/"]);
    window.location.reload();
  }

  errorInResponse(activateData: ActivateAccountModel,response: CustomResponse){
    if(response.ResponseCode == ResponseCode.Expired)
    {
      const initialState = {
        messageType: 5,
        message: "",
        ErrorCode: response.ResponseCode,
        resentfunction: () => this.ResendActivationCode(activateData)
      };
      this.showMessageServiceService.ShowErrorMessageWithOptions(initialState);
      this._router.navigate(["/"]);
      return;
    }
    this.showMessageServiceService.ShowErrorMessage(response.ResponseCode);
    this._router.navigate(["/"]);
    return;
  }
}
