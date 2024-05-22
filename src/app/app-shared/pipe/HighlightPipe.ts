import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' ,standalone: true})
export class HighlightPipe implements PipeTransform {
    transform(word: string, paragraph: string): string {
        if (word == undefined || word == '') {
            return paragraph;
        }
        const str = paragraph.replace(new RegExp(word, 'gi'), match => {
            return '<span class="highlightText">' + match + '</span>';
        });
        return str;
    }
}
