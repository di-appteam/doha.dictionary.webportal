import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { ISummaryLexicalSheet } from '../../../app-models/dictionary.model';
import { usercomment } from '../../../app-models/user-account.model';
import { HttpService } from '../../security/requests/http.service';
import { ServiceUrlManager } from '../../security/requests/serviceUrl.Manager';
import { AccountService } from '../../services/account.service';
import { CacheService } from '../../services/cache.service';
import { SharedConfiguration } from '../../services/config.service';
import { SharedService } from '../../services/shared.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-send-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './send-comment.component.html',
  styleUrls: ['./send-comment.component.scss'],
  providers:[SharedConfiguration,AccountService,SharedService,HttpService,StoreService,ServiceUrlManager,CacheService]
})
export class SendCommentComponent implements OnInit {
  sendCommentForm!: FormGroup;
  loading = false;
  submitted = false;
  isSent = false;
  lexical?: ISummaryLexicalSheet;
  messageBody: string = "";

  constructor(public bsModalRef: BsModalRef,
              private formBuilder: FormBuilder,
              private _config: SharedConfiguration,
              private userService: AccountService) { }

  ngOnInit() {
    this.sendCommentForm = this.formBuilder.group({
      email: [this._config.userInfo?.Email, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      message: ["", [Validators.required]],
      errorincollect: [false]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.sendCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.sendCommentForm.invalid || !this.lexical) {
      return;
    }

    this.loading = true;
    const userComment : usercomment  =  {
    commenttypeid : this._config.bookmarkType.lemma,
    commentitemid  :  this.lexical.ID,
    lemmaTagValue  :  this.lexical.lemmaTagValue,
    lemmaValue  :  this.lexical.lemmaValue,
    message  :  this.sendCommentForm.value.message + "<br/>" + this.messageBody,
    email  :  this.sendCommentForm.value.email,
    errorincollect  :  this.sendCommentForm.value.errorincollect,
    userid:0
    };

    this.userService.SendComment(userComment).subscribe(
      () => {
        this.isSent = true;
        this.loading = false;
      },
      () => {
        this.loading = false;
        // handle error here
      }
    );
  }

  hideModal() {
    this.bsModalRef.hide();
  }
}
