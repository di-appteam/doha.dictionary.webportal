// Import the core angular services.
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { ISummaryLexicalSheet } from "../../app-models/dictionary.model";

@Injectable()
export class ClipboardService {

    private dom: Document;


    // I initialize the Clipboard service.
    // --
    // CAUTION: This service is tightly couped to the browser DOM (Document Object Model).
    // But, by injecting the "document" reference rather than trying to reference it
    // globally, we can at least pretend that we are trying to lower the tight coupling.
    constructor(@Inject(DOCUMENT) dom: Document) {

        this.dom = dom;

    }


    // ---
    // PUBLIC METHODS.
    // ---/*replace(/ +/g, ' ').replace(/\r?\n|\r/g, ' ')
    public copyLexicalToClipBoard(toolTip :any ,item: ISummaryLexicalSheet) : void{

        let documentItem = document.getElementsByClassName(('cls-copy-' + item.ID));
        var content = "";
        for (var x = 0; x < documentItem.length; x++) {
            var str = documentItem[x].innerHTML.trim();
            str = str.replace(/<span class="cnvQCF2BSML">ﱠ<\/span>/g,'﴾').replace(/<span class="cnvQCF2BSML">ﱡ<\/span>/g,  '﴿').replace(/<span class="break"><\/span>/g, '<br>').trim();
            str = str.replace( /<span class=\"cnvAGA\"><\/span>/g," سُبْحَانَهُ وَتَعَالَى");
            str = str.replace(/<span class=\"cnvAGA\"><\/span>/g," جَلَّ جَلَالُهُ");
            str = str.replace(/<span class=\"cnvAGA\"><\/span>/g," عَزَّ وَجَلَّ");
            str = str.replace(/<span class=\"cnvAGA\">~<\/span>/g," رَحِمَهُ اللهُ");
            str = str.replace(/<span class=\"cnvOUHOD\">><\/span>/g," رَضِيَ اللهُ عَنْهُ");
            str = str.replace(/<span class=\"cnvOUHOD\"><<\/span>/g," رَضِيَ اللهُ عَنْهَا");
            str = str.replace(/<span class=\"cnvOUHOD\">}<\/span>/g," رَضِيَ اللهُ عَنْهُمْ");
            str = str.replace(/<span class=\"cnvOUHOD\">{<\/span>/g," رَضِيَ اللهُ عَنْهُمَا");
            str = str.replace(/<span class=\"cnvOUHOD\">@<\/span>/g," صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ");
            str = str.replace(/<span class=\"cnvOUHOD\">#<\/span>/g," عَلَيْهِ السَّلَامُ");
            str = str.replace(/<span class=\"cnvOUHOD\">&<\/span>/g," عليهم السّلام");
            str = str.replace(/<span class=\"cnvOUHOD\">^<\/span>/g," عَلَيْهِمَا السَّلَامُ");

            if (documentItem[x].innerHTML.trim().indexOf('justify-content-space-between') > -1)
                str = str.replace(/class="left">/g, 'class="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').replace(/<\/span><\/span>/g, '&nbsp;').replace(/<\/span>/g, '&nbsp;').replace(/<span>/g, '').replace(/<span class="dark-red">/g, '');
            content += (str + '<br>');
        }
        var displayWord = item.rootValue + " / " + item.lemmaTagValue
        this.copyLemma(content, displayWord,item.lemmaValue).then(a=>[toolTip.show(), setTimeout(() => toolTip.hide(), 700)]);
    }
    // I copy the given value to the user's system clipboard. Returns a promise that
    // resolves to the given value on success or rejects with the raised Error.
    public copyLemma(content: string, word: string,searchWord : string): Promise<string> {
        return new Promise(
            (resolve, reject): void => {

                var textarea = null;

                try {
                    var str = "<blockquote dir=\"rtl\"> <p>المادة : <a href=\"https://www.dohadictionary.org/dictionary/" + searchWord + "\">" + word + " </a> <br> " + content;
                    str += "<br> <footer><cite><a href=\"https://www.dohadictionary.org\"><i>معجم الدوحة التاريخي للغة العربية</i></a> <br> <i> مؤسسة معجم الدوحة التاريخي للغة العربية</i></cite>.</footer>";
                    str += "<br> <footer><cite><i> تاريخ الاقتباس:  " + ((new Date()).toLocaleDateString("ar", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })) + "</i></cite></footer></blockquote>"
                    // In order to execute the "Copy" command, we actually have to have
                    // a "selection" in the currently rendered document. As such, we're
                    // going to inject a Textarea element and .select() it in order to
                    // force a selection.
                    // --
                    // NOTE: This Textarea is being rendered off-screen.

                    var divelm = this.dom.createElement("div");
                    textarea = this.dom.createElement("textarea");
                    textarea.style.height = "0px";
                    textarea.style.left = "-100px";
                    textarea.style.opacity = "0";
                    textarea.style.position = "fixed";
                    textarea.style.top = "-100px";
                    textarea.style.width = "0px";
                    this.dom.body.appendChild(textarea);

                    // Set and select the value (creating an active Selection range).
                    divelm.innerHTML = str;
                    this.dom.body.appendChild(divelm);
                    //textarea.value = divelm.innerText;
                    //textarea.select();
                    this.selectElementText(divelm);
                    // Ask the browser to copy the current selection to the clipboard.
                    this.dom.execCommand("copy");
                    this.dom.body.removeChild(divelm);

                    resolve(str);

                } finally {

                    // Cleanup - remove the Textarea from the DOM if it was injected.
                    if (textarea && textarea.parentNode) {

                        textarea.parentNode.removeChild(textarea);

                    }

                }

            }
        );
    }

    selectElementText(divelm : any) {
        var range = document.createRange() // create new range object
        range.selectNodeContents(divelm) // set range to encompass desired element text
        var selection = window.getSelection() // get Selection object from currently user selected text
        if(!selection)
         return;
        selection.removeAllRanges() // unselect any user selected text (if any)
        selection.addRange(range) // add range to Selection object to select it
    }




}
