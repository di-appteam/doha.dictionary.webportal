import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { MessageModel } from "../../../app-models/showing-message.model";
import { ResponseCode } from "../../models/security";


@Component({
  selector: 'app-showing-message',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './showing-message.component.html',
  styleUrls: ['./showing-message.component.scss']
})
export class ShowingMessageComponent implements OnInit {

  messageType! : number;
  @Input() ErrorCode!:number;
  public resentfunction!: () => void;
  isReady : boolean = false;
  messageModel : MessageModel  = new MessageModel();
  @Input() message:string="";
  public responseCode = ResponseCode;
  /*, --how to handle callback function for resend
      resentfunction : () => this.clearParam()*/

  constructor(private _translate: TranslateService,public refModalRef: BsModalRef
    ,public options: ModalOptions) {
  }

  ngOnInit() {
    this.prepareModel();
  }


  prepareModel() {
    if((this.ErrorCode && this.ErrorCode != this.responseCode.Ok) || (this.message && this.message !=""))
    {
      if(!this.message  || this.message =="")
        this.message = "";
      this.messageModel  = new MessageModel(this.message);
      this.messageModel.showresent= (this.messageType == 5 );
      this.isReady = true;
      return;
    }
    this.messageModel.showresent= (this.messageType == 2);
    var messageType = "createa-account";
    messageType = this.messageType == 2 ? "forget-password" : this.messageType == 3 ? "reset-password" : this.messageType == 4 ? "comments": this.messageType == 5 ? "activate-account":this.messageType == 6 ? "login" : messageType;
    this.getMessageByType(messageType);
  }
  getMessageByType(type: string) {
    var strPath = "generalmessage." + type + ".";
    this._translate.get([(strPath + "paragraph"), (strPath + "bold-2"), (strPath + "bold-1")]).subscribe(words => {
      this.messageModel.bold1 = words[(strPath + "bold-1")];
      this.messageModel.bold2 = words[(strPath + "bold-2")];
      this.messageModel.paragraph = words[(strPath + "paragraph")];
      this.isReady = true;
    });
  }

  closeModal(){
    this.refModalRef.hide();
  }

}
