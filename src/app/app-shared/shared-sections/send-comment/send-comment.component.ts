import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { ISummaryLexicalSheet } from '../../../app-models/dictionary.model';
import { usercomment } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { SharedConfiguration } from '../../services/config.service';

@Component({
  selector: 'app-send-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './send-comment.component.html',
  styleUrls: ['./send-comment.component.scss']
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
    const userComment = new usercomment();
    userComment.commenttypeid = this._config.bookmarkType.lemma;
    userComment.commentitemid = this.lexical.ID;
    userComment.lemmaTagValue = this.lexical.lemmaTagValue;
    userComment.lemmaValue = this.lexical.lemmaValue;
    userComment.message = this.sendCommentForm.value.message + "<br/>" + this.messageBody;
    userComment.email = this.sendCommentForm.value.email;
    userComment.errorincollect = this.sendCommentForm.value.errorincollect;

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
