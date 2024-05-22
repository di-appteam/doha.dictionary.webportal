import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filterBy' ,standalone: true})

export class FilterPipe implements PipeTransform {

    transform(value: Array<any>, input: any, field: string): Array<any> {
        if(!value)
          return [];
        return (input || input === 0) ? value.reduce((prev, next) => {
            if (next[field] == (input)) { prev.push(next); }
            return prev;
        }, []) : value;
    }
}
