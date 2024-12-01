import { CommonModule, NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { first } from "rxjs";
import { ResponseCode } from "../../../app-shared/../app-models/security.model";
import { HttpService } from "../../../app-shared/security/requests/http.service";
import { ServiceUrlManager } from "../../../app-shared/security/requests/serviceUrl.Manager";
import { AccountService } from "../../../app-shared/services/account.service";
import { CacheService } from "../../../app-shared/services/cache.service";
import { SharedConfiguration } from "../../../app-shared/services/config.service";
import { SharedService } from "../../../app-shared/services/shared.service";
import { ShowMessageServiceService } from "../../../app-shared/services/showing-message.service";
import { StoreService } from "../../../app-shared/services/store.service";
import { ShowingMessageComponent } from "../../../app-shared/shared-sections/showing-message/showing-message.component";
import { PasswordValidation } from "../../../app-shared/validation/password-validation";


@Component({
  selector: 'create-account',
  standalone: true,
  imports: [TranslateModule,FormsModule,ReactiveFormsModule,NgIf,NgClass
    ,RouterModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers:[AccountService,SharedService,SharedConfiguration
    ,CacheService,ShowMessageServiceService,HttpService,StoreService,ServiceUrlManager]
})
export class CreateAccountComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userService: AccountService,
    public _sharedConfiguration:SharedConfiguration,
    //private socialAuthService: AuthService,
    private showMessageServiceService: ShowMessageServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      imagepath: [''],
      password: ['', [Validators.required, Validators.minLength(8), PasswordValidation.Strong]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public socialSignIn(socialPlatform: string) {
  /*  let socialPlatformProvider;
    if (socialPlatform == 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        var userInfo = <LoginExternalModel>userData;
        this.userService.LogInExternal(userInfo).subscribe(
          item => [this.userService.saveTokenInfo(item), window.location.reload()]);
      }
    );*/
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.RegisterUser(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data.ResponseCode != ResponseCode.Ok) {
            this.showMessageServiceService.ShowErrorMessage(data.ResponseCode);
            return;
          }
          const initialState = {
            messageType: 1
          };
          this.showMessageServiceService.openModalWithComponent(ShowingMessageComponent,{ initialState });
          this.bsModalRef.hide();
        },
        error => {
          console.log(error);
          this.loading = false;
          //handling error message
        });
  }
}
