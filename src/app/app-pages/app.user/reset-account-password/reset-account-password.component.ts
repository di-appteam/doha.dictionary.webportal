import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CustomResponse, ResetPasswordModel, ResponseCode } from '../../../app-models/user-account.model';
import { AccountService } from '../../../app-shared/services/account.service';
import { ShowMessageServiceService } from '../../../app-shared/services/showing-message.service';
import { ShowingMessageComponent } from '../../../app-shared/shared-sections/showing-message/showing-message.component';
import { PasswordValidation } from '../../../app-shared/validation/password-validation';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-account-password',
  standalone: true,
  imports: [CommonModule,TranslateModule,ReactiveFormsModule,FormsModule
    ,RouterModule],
  templateUrl: './reset-account-password.component.html',
  styleUrls: ['./reset-account-password.component.scss']
})
export class ResetAccountPasswordComponent implements OnInit {

    private sub!: Subscription;
    public requestActivated: boolean = false;
    public activateAccount! : ResetPasswordModel ;
    resetPasswordForm!: FormGroup;
    loading = false;
    submitted = false;
    passwordAlreadyExist : boolean = false;

    constructor(private _route: ActivatedRoute,
      private _showMessageServiceService : ShowMessageServiceService,
      private formBuilder: FormBuilder, private _accountService: AccountService, private _router: Router) { }

    ngOnInit() {
      this.sub = this._route.params.subscribe(
        (params : any) => {
          if (params.email && params.code && this.requestActivated == false) {
            this.requestActivated = true;
            this.activateAccount = new ResetPasswordModel(params.email, params.code);
            this.resetPasswordForm = this.formBuilder.group({
              email:[params.email],
              code:[params.code],
              newpassword: ['', [Validators.required, Validators.minLength(8), PasswordValidation.Strong]],
              confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
            }, {
                validator: PasswordValidation.MatchPassword // your validation method
              });
          }
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.resetPasswordForm.controls; }


    onSubmit(): void {
      this.submitted = true;
      // stop here if form is invalid
      if (this.resetPasswordForm.invalid) {
        return;
      }
      this.loading = true;
      this._accountService.ResetPassword(this.resetPasswordForm.value).pipe(first()).subscribe(
        item => [this.PrepareResponse(item)],
        error => {
          this.loading = false;
          //handling error message
        });
    }

    PrepareResponse(response: CustomResponse) {
      this.loading = false;
      if (response.ResponseCode == ResponseCode.PasswordAlreadyExist)
       {
        this.passwordAlreadyExist = true;
        return;
       }
      if (response.ResponseCode != ResponseCode.Ok)
       {
        this._showMessageServiceService.ShowErrorMessage(response.ResponseCode);
        return;
       }
      const initialState = {
        messageType: 3
      };
      this._showMessageServiceService.openModalWithComponent(ShowingMessageComponent,{ initialState });
      this.clearParam();
    }

    clearParam() {
      var routUrl = ("/");
      this._router.navigate([routUrl]);
    }

  }
