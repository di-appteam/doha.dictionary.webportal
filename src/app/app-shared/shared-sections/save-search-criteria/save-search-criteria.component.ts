import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchDictionaryModel } from '../../../app-models/dictionary.model';
import { userbookmarks } from '../../../app-models/user-account.model';
import { AccountService } from '../../services/account.service';
import { SharedConfiguration } from '../../services/config.service';

@Component({
  selector: '[modal-partial]',
  standalone: true,
  imports: [CommonModule,TranslateModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './save-search-criteria.component.html',
  styleUrls: ['./save-search-criteria.component.scss']
})
export class SaveSearchCriteriaComponent implements OnInit {
  saveSearchForm?: FormGroup ;
  loading = false;
  submitted = false;
  searchCriteria : string = "";

  constructor(public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,private _config: SharedConfiguration,private userService:AccountService) { }

  ngOnInit() {
    this.saveSearchForm = this.formBuilder.group({
      displayname: ['', [
      ]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.saveSearchForm?.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.saveSearchForm?.invalid) {
      return;
    }

    this.loading = true;
    var userbookmark = new userbookmarks();
    var searchDictionaryModel = <SearchDictionaryModel>JSON.parse(this.searchCriteria);
    userbookmark.bookmarktypeid = this._config.bookmarkType.dictionarysearchmodel;
    userbookmark.displayname = this.saveSearchForm?.value.displayname?this.saveSearchForm.value.displayname : ('عملية بحث بكلمة ' + searchDictionaryModel.SearchWord);
    userbookmark.searchcriterias = this.searchCriteria;
    return this.userService.AddBookmark(userbookmark, true).subscribe(item=> this.bsModalRef.hide());
  }
}
