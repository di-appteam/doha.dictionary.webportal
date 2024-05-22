import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { SharedConfiguration } from '../services/config.service';


@Directive({
  standalone: true,
  selector: '[hasPermission]'
})
/****** to use directive : [hasPermission]="['can_write', 'can_read']" *******/
export class HasPermissionDirective {
  private permissions: any;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _sharedConfiguration : SharedConfiguration
  ) {
  }


  @Input()
  set hasPermission(val:any) {
    this.permissions = val;
    this.updateView(val);
  }

  private updateView(perm : string[]) {
    if (this.checkPermission(perm)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission(perm : string[]) {
    let hasPermission = false;

    if (perm && this._sharedConfiguration.userInfo && this._sharedConfiguration.userInfo.Permissions && this._sharedConfiguration.userInfo.Permissions.length > 0) {
      for (var x = 0; x < perm.length; x++) {
        var perList = this._sharedConfiguration.userInfo.Permissions.find((y: any) => y == perm[x]);
        hasPermission = ( perList && perList.length > 0) ? true : false;
        if (hasPermission)
          break;
      }
    }

    return hasPermission;
  }
}
