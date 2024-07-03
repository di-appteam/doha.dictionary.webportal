import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SharedConfiguration } from "../services/config.service";

@Component({
  template: ''
})
export class BaseComponent {
  constructor(
    public _router: Router,
    public _config: SharedConfiguration) {
    if (!this._config.validToken())
      this._router.navigate([('404')]);
  }

}
