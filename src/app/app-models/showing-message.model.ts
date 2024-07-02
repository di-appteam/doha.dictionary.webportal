export class MessageModel {
    constructor(str:string = ""){
        this.paragraph = str;
        this.showcontinuebtn = true;
        this.bold1="";
        this.bold2="";
        this.showresent = false;
    }
    bold1: string;
    bold2: string;
    paragraph:string;
    showcontinuebtn:boolean;
    showresent:boolean;
    resentfunction!: () => void;
}
