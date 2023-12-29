import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform
{
    
    /**
     * Constructor
     */
    constructor()
    {
    }

    /**
     * Transform
     *
     * @param value A string or an array of strings to find from source
     * @param key Key of the object property to look for
     * @param source Array of objects to find from
     */
    transform(size: number): any
    {

        
        let i: number = size > 0 ? Math.floor( Math.log(size) / Math.log(1024)) : 0;

        const convertedSize: string =  parseFloat((size/Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];

        return convertedSize;

    }
}
