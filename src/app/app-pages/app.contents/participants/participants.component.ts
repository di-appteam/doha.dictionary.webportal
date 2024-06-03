import { Component, OnInit } from '@angular/core';
import { ParticipantModalComponent } from './participant-modal/participant-modal.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { groupedparticipants, participantdata, participantgroup } from '../../../app-models/participants.models';
import { NavDataInterface } from '../../../app-models/shared.model';
import { SharedConfiguration } from '../../../app-shared/services/config.service';
import { ParticipantsService } from '../../../app-shared/services/participants.service';
import { DictionarySearchFormComponent } from '../../../app-shared/shared-sections/dictionary-search-section/search-form.component';
import { RootSectionComponent } from '../../../app-shared/shared-sections/root-section/root-section.component';
import { SideNavComponent } from '../../../app-shared/shared-sections/side-nav/side-nav.component';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, TranslateModule,RootSectionComponent,DictionarySearchFormComponent,SideNavComponent],
 templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
  providers:[ParticipantsService]
})
export class ParticipantsComponent implements OnInit {
  public selectedTap?: NavDataInterface ;
  public participantlist: groupedparticipants[] = [];
  public navData: NavDataInterface[] = [
    {
      title: 'أعضاء المجلس العلمي',
      href: "#1",
      display: 1,
      id: 1
    },
    {
      title: 'العاملون بالمعجم',
      href: "#2",
      display: 1,
      id: 2
    },
    {
      title: 'موظفون سابقون بالمعجم',
      href: "#3",
      display: 1,
      id: 3
    },
    {
      title: 'الخبرء المتعاونون',
      href: "#44",
      display: 2,
      id: 44,
      subNav: [
        {
          title: 'خبراء لغويون',
          href: "#4",
          display: 2,
          id: 4
        },
        {
          title: 'خبراء تقنيون',
          href: "#5",
          display: 2,
          id: 5
        },

      ]
    }
  ]

  public bsModalRef?: BsModalRef;
  constructor(private meta: Meta, private _config: SharedConfiguration, public modalService: BsModalService, public participantsService: ParticipantsService) {
    this.meta.updateTag({ name: 'title', content: 'المشاركون فى المعجم' }, "name='title'");
    this.meta.updateTag({ name: 'og:title', content: 'المشاركون فى المعجم' }, "name='og:title'");
    this.meta.updateTag({ name: 'twitter:title', content: 'المشاركون فى المعجم' }, "name='twitter:title'");
    this.meta.updateTag({ name: 'description', content: 'شارَك في بناء المعجم قرابة ثلاث مئة من أساتذة الجامعات والخبراء والعلماء في عدد من الدول العربية، من الأردن والإمارات وتونس والجزائر والسعودية وسوريا والعراق وفلسطين وقطر والكويت ولبنان وليبيا ومصر والمغرب وموريتانيا واليمن.' }, "name='description'");
    this.meta.updateTag({ name: 'og:description', content: 'شارَك في بناء المعجم قرابة ثلاث مئة من أساتذة الجامعات والخبراء والعلماء في عدد من الدول العربية، من الأردن والإمارات وتونس والجزائر والسعودية وسوريا والعراق وفلسطين وقطر والكويت ولبنان وليبيا ومصر والمغرب وموريتانيا واليمن.' }, "name='og:description'");
    this.meta.updateTag({ name: 'twitter:description', content: 'شارَك في بناء المعجم قرابة ثلاث مئة من أساتذة الجامعات والخبراء والعلماء في عدد من الدول العربية، من الأردن والإمارات وتونس والجزائر والسعودية وسوريا والعراق وفلسطين وقطر والكويت ولبنان وليبيا ومصر والمغرب وموريتانيا واليمن.' }, "name='twitter:description'");

    this.meta.updateTag({ name: 'url', content: window.location.href }, "name='url'");
    this.meta.updateTag({ name: 'og:url', content: window.location.href }, "name='og:url'");
    this.meta.updateTag({ name: 'twitter:url', content: window.location.href }, "name='twitter:url'");
  }

  ngOnInit() {
    this.GetGroups();
    this._config.obsSelectedPart.subscribe(
      id => {
        if (id)
          this.GetParticipantsByGroupId(id);
      });
  }
  openParticipantModal(participantItem: any) {

    const initialState = {
      participant:participantItem
    };
    this.bsModalRef = this.modalService.show(ParticipantModalComponent, { initialState, class: "modal-sm participants-modal" });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  GetParticipantsByGroupId(groupId:number) {
    this.selectedTap = this.navData.filter(a => a.id == groupId || ( a.subNav && a.subNav.filter(e=>e.id == groupId).length > 0 ))[0];
    if(!this.selectedTap)
    {
      this.selectedTap = this.navData.filter(a => a.subNav && a.subNav.filter(e=>e.id == groupId).length > 0 )[0].subNav?.filter(e=>e.id == groupId)[0];
    }
    this.participantlist = [];
    this.participantsService.GetParticipantsByGroup(groupId)
      .subscribe(participants => [this.PrepareParticipantList(<participantdata[]>participants)]);
  }
  GetGroups() {
    this.participantsService.GetGroups()
      .subscribe(groups => [this.PrepareGroupList(<participantgroup[]>groups)]);
  }

  PrepareGroupList(groups: participantgroup[]) {
    this.navData = [];
    var groupsWithoutparent = groups.filter(a => a.parentgroupname == '');
    for (var i = 0; i < groupsWithoutparent.length; i++) {
      this.navData.push({
        title: groupsWithoutparent[i].groupname,
        href: ("#" + groupsWithoutparent[i].groupid),
        display: groupsWithoutparent[i].datadisplay,
        id: groupsWithoutparent[i].groupid
      });
    }
    var groupsWithParent = this.groupBy(groups.filter(a => a.parentgroupname != ''), (a : any ) => a.parentgroupname);
    const groupsWithParentArr = Array.from(groupsWithParent.values());
    for (var i = 0; i < groupsWithParentArr.length; i++) {
      var item = groupsWithParentArr[i];
      var supNavArr = [];
      for (var e = 0; e < item.length; e++) {
        supNavArr.push({
          title: item[e].groupname,
          href: ("#" + item[e].groupid),
          display: item[e].datadisplay,
          id: item[e].groupid
        });
      }
      this.navData.push({
        title: item[0].parentgroupname,
        href: ("#" + item[0].groupid * 2),
        display: item[0].datadisplay,
        id: item[0].groupid * 2,
        subNav: supNavArr
      });
    }
    this.GetParticipantsByGroupId(groups[0].groupid);
  }


  PrepareParticipantList(gparticipants: participantdata[]) {

    let dict: { [key: string]: participantdata[] };
    var participentGroups = this.groupBy(gparticipants, (a : any) => a.subcategory);
    participentGroups.forEach((value: participantdata[], key: string) => {
      this.participantlist.push({ 'groupname': key, 'participantlist': value })
    });
  }

  groupBy(list:any, keyGetter:any) {
    const map = new Map();
    list.forEach((item:any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

}
