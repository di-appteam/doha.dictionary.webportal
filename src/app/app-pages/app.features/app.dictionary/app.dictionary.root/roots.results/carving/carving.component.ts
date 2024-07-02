import { NgIf, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule, FaIconComponent, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faXTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ShareButtonDirective } from "ngx-sharebuttons";
import { ShareButtons } from "ngx-sharebuttons/buttons";
import { ICarvingLexicalSheet } from "../../../../../../app-models/dictionary.model";
import { HasPermissionDirective } from "../../../../../../app-shared/directive/permissions.directive";
import { SharedFunctions } from "../../../../../../app-shared/services/config.service";
import { DictionaryService } from "../../../../../../app-shared/services/dictionary.service";
import { SharedLemmaComponentValues } from "../../../../../../app-shared/services/lemma.general.service";
import { SearchResults } from "../../../../app.bibliography/app.bibliography.sections/section.search.results/b-search-results.models";
import { TextFormComponent } from "../../../app.dictionary.sections/section.static.text/text-form.component";


@Component({
  selector: 'app-carving',
  standalone: true,
  templateUrl: './carving.component.html',
  styleUrls: ['../roots-results.component.scss'],
  imports: [FormsModule, NgIf, NgClass,NgFor,TranslateModule,
    NgSelectModule, TextFormComponent,
    FontAwesomeModule,
    AccordionModule,
    ShareButtons,
    ShareButtonDirective, FaIconComponent,
    HasPermissionDirective]
})
export class CarvingComponent implements OnInit, OnChanges {

  @Input() rootId?: number;
  oldRootId: number = 0;
  CarvingLexicalSheetList: ICarvingLexicalSheet[] = [];
  IsReady: boolean = false;
  public data?: SearchResults;
  public detailsDropdownOptions :any[] = [];
  public selectedDetailsOption = 1;
  constructor(
    library: FaIconLibrary,private _dictionaryService: DictionaryService,
    private _sharedFunctions: SharedFunctions,
    private _sharedLemmaComponentValues: SharedLemmaComponentValues,
    private _translate: TranslateService) {
      // Add icons to the library
      library.addIcons(faShareAlt,faFacebook,faTwitter,faLinkedin,faXTwitter,faWhatsapp);
    }

  ngOnInit() {
    this._translate.get(["general.collapsall", "general.expandall"]).subscribe(words => {
      this.detailsDropdownOptions = [
        {
          text: words["general.collapsall"],
          value: 1
        },
        {
          text: words["general.expandall"],
          value: 2
        },
      ];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.rootId === this.oldRootId || !this.rootId)
      return;
    else (this.rootId && this.rootId !== this.oldRootId)
    {
      this.IsReady = false;
      this.oldRootId = this.rootId;
      this.getCarvingLexicalSheet();
    }
  }
  getCarvingLexicalSheet() {
    this.CarvingLexicalSheetList = [];
    this._sharedLemmaComponentValues.CountCarvTab = 0;
    this._dictionaryService.GetCarvingLexicalSheetByRootId(this.oldRootId).subscribe(
      item => [this.CarvingLexicalSheetList = <ICarvingLexicalSheet[]>this._sharedFunctions.reFormateSheetList(item), this.onFinishRequest()]);
  }
  onFinishRequest(): void {
    this._sharedLemmaComponentValues.CountCarvTab = this.CarvingLexicalSheetList.length;
    this.IsReady = (this.CarvingLexicalSheetList.length > 0);
  }

}
