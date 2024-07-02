import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ShowingMessageComponent } from "../shared-sections/showing-message/showing-message.component";

@Injectable()
export class ShowMessageServiceService {
    bsModalRef!: BsModalRef;

    constructor(private modalService: BsModalService) {

    }

    openModalWithComponent(modalComponent: any, initialState  : any) {
        this.bsModalRef = this.modalService.show(modalComponent,{initialState : initialState,class : 'modal-sm'});
        this.bsModalRef.content.closeBtnName = 'Close';
    }


  ShowErrorMessage(errorcode: number, bsModalRef?: BsModalRef): void {

    this.openModalWithComponent(ShowingMessageComponent, {  message: null,
      ErrorCode: errorcode});
    if (bsModalRef)
      bsModalRef.hide();
  }

  ShowErrorMessageWithOptions(initialState: any, bsModalRef: BsModalRef): void {
    this.openModalWithComponent(ShowingMessageComponent, initialState);
    if (bsModalRef)
      bsModalRef.hide();
  }
}
