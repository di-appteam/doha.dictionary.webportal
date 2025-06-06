﻿import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',standalone: true
})
export class OrderByPipe implements PipeTransform {

    transform(array: Array<any>, args: string): Array<any> {

        if (!array || array === undefined || array.length === 0) { return []; }

        array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                return -1;
            } else if (a[args] > b[args]) {
                return 1;
            } else {
                return 0;
            }
        });

        return array;
    }

}
