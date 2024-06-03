import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NavDataInterface } from '../../../app-models/shared.model';
import { SharedConfiguration } from '../../services/config.service';


@Component({
  selector: 'side-nav',
  standalone: true,
  imports: [NgIf, NgClass,NgFor ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() navData?: NavDataInterface[];
  public sideNavOpened: boolean = false;
  public selectedItem: NavDataInterface = {
    title: 'أعضاء المجلس العلمي',
    href: "#1",
    id: 1
  };
  constructor(private _config: SharedConfiguration) { }

  ngOnInit() {
  }
  toggleSideNav() {
    this.sideNavOpened = !this.sideNavOpened;
  }
  closeSideNav() {
    this.sideNavOpened = false;
  }
  selectItem(item: NavDataInterface) {
    this.closeSideNav();
    this.selectedItem = item;
    if (!item.subNav)
      this._config.obsSelectedPart.next(item.id);
  }
}
