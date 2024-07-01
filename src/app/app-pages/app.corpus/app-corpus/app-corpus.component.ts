import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchSDModel } from '../../../app-models/corpus.model';
import { SearchResults } from '../../../app-models/dictioanry.search.results.models';
import { SharedCorpusComponentValues } from '../../../app-shared/services/corpus.general.service';
import { CorpusService } from '../../../app-shared/services/corpus.service';
import { SearchFormComponent } from '../app.corpus.sections/section.search.form/search-form.component';
import { SearchResultsComponent } from '../app.corpus.sections/section.search.results/c-search-results.component';

@Component({
  selector: 'app-app-corpus',
  standalone: true,
  imports: [ SearchFormComponent,
    SearchResultsComponent
    ],
  templateUrl: './app-corpus.component.html',
  styleUrl: './app-corpus.component.scss',
  providers:[SharedCorpusComponentValues,CorpusService]
})
export class AppCorpusComponent implements OnInit, AfterViewInit {
  public searchModal: SearchSDModel = new SearchSDModel();
  public searchResults?: SearchResults;
  private sub?: Subscription;
  private subParm?: Subscription;

  constructor(private meta:Meta,public _sharedCorpusComponentValues: SharedCorpusComponentValues, private _route: ActivatedRoute) {

    if (typeof window !== "undefined") {
    this.meta.updateTag({name: 'title',content: 'البحث في المدونة اللغوية'},"name='title'");
    this.meta.updateTag({name: 'og:title',content: 'البحث في المدونة اللغوية'},"name='og:title'");
    this.meta.updateTag({name: 'twitter:title',content: 'البحث في المدونة اللغوية'},"name='twitter:title'");
    this.meta.updateTag({name: 'description',content: 'يمكنكم البحث في مُدوَّنةُ مُعجم الدَّوحة التاريخي للغة العربية التي تشتمل على محتوى التراث العربيّ المدون إلى غاية 200 هـ.'},"name='description'");
    this.meta.updateTag({name: 'og:description',content: 'يمكنكم البحث في مُدوَّنةُ مُعجم الدَّوحة التاريخي للغة العربية التي تشتمل على محتوى التراث العربيّ المدون إلى غاية 200 هـ.'},"name='og:description'");
    this.meta.updateTag({name: 'twitter:description',content: 'يمكنكم البحث في مُدوَّنةُ مُعجم الدَّوحة التاريخي للغة العربية التي تشتمل على محتوى التراث العربيّ المدون إلى غاية 200 هـ.'},"name='twitter:description'");
  }
}


  ngOnInit() {
    this.sub = this._sharedCorpusComponentValues.obsCtrSearch.subscribe(
     ( searchModal : any)=> {
        this.searchModal = new SearchSDModel(searchModal.searchWord);
      });
  }
  ngAfterViewInit(): void {
    this.subParm = this._route.params.subscribe(
      (params : any) => {
        if (params.word && params.word.length > 0 && params.word != '') {
          this._sharedCorpusComponentValues.obsStrSearch.next(params.word);
          return;
        }
      });
  }

}
