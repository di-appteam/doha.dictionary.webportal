import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { first } from "rxjs";
import { ResponseCode } from "../../../app-models/user-account.model";
import { HttpService } from "../../../app-shared/security/requests/http.service";
import { ServiceUrlManager } from "../../../app-shared/security/requests/serviceUrl.Manager";
import { AccountService } from "../../../app-shared/services/account.service";
import { CacheService } from "../../../app-shared/services/cache.service";
import { SharedConfiguration } from "../../../app-shared/services/config.service";
import { SharedService } from "../../../app-shared/services/shared.service";
import { ShowMessageServiceService } from "../../../app-shared/services/showing-message.service";
import { StoreService } from "../../../app-shared/services/store.service";
import { ShowingMessageComponent } from "../../../app-shared/shared-sections/showing-message/showing-message.component";


@Component({
  selector: 'forget-password',
  standalone: true,
  imports: [CommonModule,TranslateModule,ReactiveFormsModule,FormsModule
    ,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[AccountService,SharedService,SharedConfiguration
    ,CacheService,ShowMessageServiceService,HttpService,StoreService,ServiceUrlManager]
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup ;
  loading = false;
  submitted = false;
  invalidEmail = false;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userService: AccountService,
    private showMessageServiceService: ShowMessageServiceService
  ) { }

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.forgetPasswordForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.AddResetPasswordRequest(this.forgetPasswordForm.value.email)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data.ResponseCode != ResponseCode.Ok) {
            this.invalidEmail = true;
            this.showMessageServiceService.ShowErrorMessage(data.ResponseCode, this.bsModalRef);
            return;
          }
          const initialState = {
            messageType: 2,
            resentfunction: () => this.onSubmit()
          };
          this.showMessageServiceService.openModalWithComponent(ShowingMessageComponent, { initialState });
          this.bsModalRef.hide();
        },
        error => {
          this.loading = false;
          this.invalidEmail = true;
          //handling error message
        });
  }

}
