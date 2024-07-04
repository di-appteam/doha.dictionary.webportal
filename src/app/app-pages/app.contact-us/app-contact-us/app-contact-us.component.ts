import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { contactusmodel } from '../../../app-models/contact-us.model';
import { AlertEnum } from '../../../app-models/dictioanry.search.results.models';
import { ContactUsService } from '../../../app-shared/services/contact-us.service';
import { AlertComponent } from '../../../app-shared/shared-sections/alert/alert.component';

@Component({
  selector: 'app-app-contact-us',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, FormsModule, AlertComponent
    , RouterModule],
  templateUrl: './app-contact-us.component.html',
  styleUrl: './app-contact-us.component.scss',
  providers: [ContactUsService]
})
export class AppContactUsComponent implements OnInit {

  contactUsForm!: FormGroup;
  loading = false;
  submitted = false;
  isSent = true;
  messageSent = false;
  message: string = "";
  messageType: AlertEnum = AlertEnum.SUCCCESS;

  constructor(private meta: Meta, private translateService: TranslateService,
    private formBuilder: FormBuilder, private contactusService: ContactUsService) {
    this.meta.updateTag({ name: 'title', content: 'تواصل معنا' }, "name='title'");
    this.meta.updateTag({ name: 'og:title', content: 'تواصل معنا' }, "name='og:title'");
    this.meta.updateTag({ name: 'twitter:title', content: 'تواصل معنا' }, "name='twitter:title'");
    this.meta.updateTag({ name: 'description', content: 'تواصل معنا - معجم الدوحة التاريخي للغة العربية - ص. ب: 10277، شارع الطرفة (800)، منطقة 70 وادي البنات، الظعاين، قطر. info.dictionary@dohainstitute.org' }, "name='description'");
    this.meta.updateTag({ name: 'og:description', content: 'تواصل معنا - معجم الدوحة التاريخي للغة العربية - ص. ب: 10277، شارع الطرفة (800)، منطقة 70 وادي البنات، الظعاين، قطر. info.dictionary@dohainstitute.org' }, "name='og:description'");
    this.meta.updateTag({ name: 'twitter:description', content: 'تواصل معنا - معجم الدوحة التاريخي للغة العربية - ص. ب: 10277، شارع الطرفة (800)، منطقة 70 وادي البنات، الظعاين، قطر. info.dictionary@dohainstitute.org' }, "name='twitter:description'");

    this.meta.updateTag({ name: 'url', content: window.location.href }, "name='url'");
    this.meta.updateTag({ name: 'og:url', content: window.location.href }, "name='og:url'");
    this.meta.updateTag({ name: 'twitter:url', content: window.location.href }, "name='twitter:url'");
  }

  ngOnInit() {
    this.CreateContactUsForm();
  }

  private CreateContactUsForm() {
    this.messageSent = false;
    this.contactUsForm = this.formBuilder.group({
      From: ["", [Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      Name: ["", [Validators.required]],
      Subject: ["", [Validators.required]],
      Body: ["", [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactUsForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactUsForm.invalid) {
      return;
    }
    this.loading = true;
    var contactUsModel = new contactusmodel();
    contactUsModel.Name = this.contactUsForm.value.Name;
    contactUsModel.Subject = this.contactUsForm.value.Subject;
    contactUsModel.Body = this.contactUsForm.value.Body;
    contactUsModel.From = this.contactUsForm.value.From;
    return this.contactusService.SendContactUs(contactUsModel).subscribe((response) => this.resetForm(response.isSent));
  }

  resetForm(responseStatus: boolean) {
    if (responseStatus) {
      this.message = this.translateService.instant("generalmessage.server-success-sending-email");
      this.CreateContactUsForm();
      this.loading = false;
      this.messageSent = true;
      this.submitted = false;
      return;
    }
    this.message = this.translateService.instant("generalmessage.server-error-sending-email");
    this.messageType = AlertEnum.ERROR;
    this.loading = false;
    this.messageSent = true;
    this.submitted = false;
  }
}
