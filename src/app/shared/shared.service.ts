import { Injectable } from '@angular/core';
import { get } from 'lodash';
import moment from 'moment';
import { DatePipe, formatDate } from '@angular/common';
import { RestAPIConnectorProvider } from 'app/core/core-services/providers/rest-api-connector';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    leadId: number;

    /**
     * Constructor
     */
    constructor(
        private restAPIConnector: RestAPIConnectorProvider,
        public datepipe: DatePipe,
    ) {
    }

    /**
     * 
     * Returns the formatted date
     * 
     * @param date date
     * @param format date format
     * 
     */
    public getFormattedDate(date: any, format: string): any {

        return moment(date).format(format)

    }

    public convertToDateFormat(date: any): any {

        let formattedDate: any = new Date(date);
        const dd = String(formattedDate.getDate()).padStart(2, '0');
        const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const yyyy = formattedDate.getFullYear();

        formattedDate = yyyy + '-' + mm + '-' + dd;

        return formattedDate;
    }

    /**
     * Convert unix timestamp to readable date format.
     * 
     * @param date Date
     * @param format Format
     * @returns FormattedDate
     */
    public convertUnixTimestampToDateFormat(date: any, format?: any): any {

        if (!format) {
            format = 'MM/dd/yyyy';
        }
        return date > 0 ? new Date(formatDate(new Date(date * 1000), format, 'en')) : '';

    }

    public convertUnixTimestampToDate(date: any, format?: any): any {

        if (!format) {
            format = 'MM/dd/yyyy';
        }
        return date > 0 ? formatDate(new Date(date * 1000), format, 'en') : '';

    }

    public getFormattedDateAndTime(date: any, format?: any): any {

        if (date) {
            return new Date(moment(date).format(format || 'MM/DD/YYYY h:mm:ss'));
        } else {
            return '';
        }
    }

}
