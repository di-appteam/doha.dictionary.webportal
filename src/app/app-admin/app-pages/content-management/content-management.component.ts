import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [
    CommonModule,
    AdminContainerComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    QuillModule],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss'],
})
export class ContentManagementComponent implements OnInit {
  aboutDictionaryHTML: SafeHtml | null = null; // For rendering the current HTML
  sanitizedContent: SafeHtml = '';
  contentForm: FormGroup;
  categories = ['Dictionary Intro', 'Dictionary Standard', 'Dictionary Words'];
  selectedCategory: string = this.categories[0];
  content: any[] = [];

  constructor(
    private http: HttpClient,
    private _domSanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.contentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadHTMLContent();
  }

  /**
   * Load HTML content dynamically from an external file
   */
  loadHTMLContent(): void {
    this.http
      .get('assets/template-files/about-dictionary.png', { responseType: 'text' })
      .subscribe((data: string) => {
        const updatedHTML = this.updateHTMLContent(data);
        this.aboutDictionaryHTML = this._domSanitizer.bypassSecurityTrustHtml(updatedHTML); // Rendered HTML
        this.contentForm.patchValue({ content: updatedHTML }); // Populate editor
      });
  }

  /**
   * Save Updated Content
   */
  saveContent(): void {
    this.sanitizedContent = this._domSanitizer.bypassSecurityTrustHtml(this.contentForm.value.content);
    /*if (this.contentForm.valid) {
      const updatedHTML = this.contentForm.value.content;

      // Update displayed HTML
      this.aboutDictionaryHTML = this._domSanitizer.bypassSecurityTrustHtml(updatedHTML);

      // Save logic (e.g., send to server)
      console.log('Updated HTML:', updatedHTML);

      alert('Content saved successfully!');
    }*/
  }


  loadContent(): void {
    // TODO: Send updated order to the server
  }


  activateRTL(editor: any): void {
    editor.format('align', 'right');
    editor.format('direction', 'rtl');
  }

  /**
* Update HTML content to handle `align` and `dir` attributes
* @param htmlContent - The raw HTML content
*/
  updateHTMLContent(htmlContent: string): string {
    // Replace the div with the desired change
    htmlContent = htmlContent.replace(
      /<div class="content-container">/,
      '<div class="content-container" style="text-align:right;">'
    );
    htmlContent = htmlContent.replace(/"center"/g, 'center');
    htmlContent = htmlContent.replace(/"rtl"/g, 'rtl');
    htmlContent = htmlContent.replace(/"ltr"/g, 'ltr');
    htmlContent = htmlContent.replace(/"left"/g, 'left');
    htmlContent = htmlContent.replace(/"right"/g, 'right');
    // Handle `align` attribute without quotes: Replace with `text-align`
    htmlContent = htmlContent.replace(
      /align=([^\s>]+)/g,
      (match, alignValue) => `style="text-align: ${alignValue};"`
    );

    // Handle `dir` attribute without quotes: Replace with `direction`
    htmlContent = htmlContent.replace(
      /dir=([^\s>]+)/g,
      (match, dirValue) => `style="direction: ${dirValue};"`
    );

    // Merge `style` attributes for tags with both `align` and `dir`
    htmlContent = htmlContent.replace(
      /style="([^"]*?text-align: [^;]*;)"\s*style="([^"]*?direction: [^;]*;)"/g,
      (match, textAlignStyle, directionStyle) => `style="${textAlignStyle} ${directionStyle}"`
    );

    // Ensure no duplicate `style` attributes remain
    htmlContent = htmlContent.replace(
      /(style="[^"]*?)\s+style="/g,
      (match, existingStyle) => existingStyle
    );
    return htmlContent.replace(/direction:\s*"?RTL"?;/g, '');
  }


}
