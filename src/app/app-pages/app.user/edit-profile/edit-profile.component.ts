import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { SharedConfiguration } from '../../../core/shared/sharedConfiguration';
import { AccountService } from '../../user-account.service';
import { ShowMessageServiceService } from '../../../shared/showing-message/showing-message.service';
import { Validators, FormGroup, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { first } from 'rxjs/operators';
import { CustomResponse, ResponseCode, ProfileInfo } from '../../user-account.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, AfterViewInit {
  editProfileForm: FormGroup;
  loading = false;
  submitted = false;
  @Output() ChangeEditMode = new EventEmitter();

  constructor(private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public _sharedConfiguration: SharedConfiguration, private _router: Router, private _accountService: AccountService,
    private showMessageServiceService: ShowMessageServiceService) { }

  ngOnInit() {
    this._accountService.GetProfileData()
    .subscribe(res => [this.prepareForm(res)],
      error => []);
  }

  prepareForm(res : ProfileInfo) {
    this.editProfileForm = this.formBuilder.group({
      Name: [res.name, [Validators.required]],
      Organization: [res.organization, [Validators.required]],
      Mobile: [res.mobile],
      Job: [res.job],
      EduDegree: [res.edudegree]
    });
  }

  ngAfterViewInit(): void {
  }


  // convenience getter for easy access to form fields
  get f() { return this.editProfileForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }

    this.loading = true;
    this._accountService.UpdateUserProfile(this.editProfileForm.value).pipe(first()).subscribe(
      item => [this.PrepareResponse(item)],
      error => {
        this.loading = false;
        //handling error message
      });
  }

  PrepareResponse(response: CustomResponse) {
    this.loading = false;
    if (response.ResponseCode == ResponseCode.InValidRequest) {
      //ToDo: Handle exception case
      return;
    }
    this._sharedConfiguration.userInfo.Name = this.editProfileForm.value.Name;
    this.onCancel();
  }


  onCancel() {
    this.ChangeEditMode.next();
  }

}
