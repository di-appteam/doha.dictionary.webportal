import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@Injectable({
  providedIn: 'root',
})

export class TranslationService {
  /**
   * A BehaviorSubject used as Observable to update language in other Components/Directives
   */
  currentLanguage = new BehaviorSubject<string>(this.getLanguage());

  isBrowser;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init(): void {
    HttpLoaderFactory(this.http);
    this.translate.reloadLang('ar');
    this.translate.addLangs(['en', 'ar']); // Add supported languages
    this.translate.setDefaultLang('ar'); // Set default language

    // Load translations from JSON files
    this.translate.use('ar'); // Use Arabic as default language
  }

  /**
   * `getCurrentLanguage()` Get the last updated language.
   * @returns An Observable of the last updated language
   */
  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  setLang(lang: string): void {
    if (this.isBrowser) {
      if (!lang) {
        this.currentLanguage.next('en');
      } else {
        localStorage.setItem('lang', lang);
        this.currentLanguage.next(lang);
      }
    }
  }

  getLanguage(): string {
    if (this.isBrowser) {
      if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'en');
      }
      return localStorage.getItem('lang') || ('en' as string);
    }
    return 'en';
  }

}
