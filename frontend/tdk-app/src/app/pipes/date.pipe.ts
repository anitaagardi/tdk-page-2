import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'datePipe' })
export class datePipe implements PipeTransform {
    transform(date: string): string {
        if (date == null) return "";
        if (date == undefined) return "";
        if (date == "") return "";
        if (date === undefined) return "";

        return moment(date).format("YYYY-MM-DD");
    }
}