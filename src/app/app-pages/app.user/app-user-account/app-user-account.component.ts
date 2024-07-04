import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../../../app-shared/security/base.component';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { SecurityService } from '../../../app-shared/services/security.service';
import { ShowMessageServiceService } from '../../../app-shared/services/showing-message.service';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-app-user-account',
  standalone: true,
  imports: [NgIf,NgFor,NgClass,RouterLink,TranslateModule,EditProfileComponent,ActivateAccountComponent],
  templateUrl: './app-user-account.component.html',
  styleUrl: './app-user-account.component.scss'
})
export class AppUserAccountComponent extends BaseComponent implements OnInit {

  public activatedAccount: boolean = false;
  public isEditMode:boolean = false;

  constructor(private meta : Meta,private _route: ActivatedRoute,private cdr: ChangeDetectorRef,
    public _sharedConfiguration: SharedConfiguration, private _securityService : SecurityService,
    private showMessageServiceService: ShowMessageServiceService, public override _router: Router,
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
    this._route.params.subscribe(
      (params :any)=> {
        if (params.status) {
          this.activatedAccount = true;
        }
      });
  }

  logOut(): void {
    this._securityService.clearLoginInfo();
    this._sharedConfiguration.userInfo = undefined;
    window.location.reload();
  }

  ChangeEditMode(): void {
    this.isEditMode =!this.isEditMode;
    this.cdr.detectChanges();
  }

}
