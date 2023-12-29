import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name: 'formatAmount'
})
export class SharedAmountPipe implements PipeTransform
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
    transform(amount: number, currencyCode: string = '', display: 'code' | 'symbol' | 'symbol-narrow' = 'code', digitInfo: string): any
    {
        const currencyPipe = new CurrencyPipe('en-US');

        let result = currencyPipe.transform(amount, currencyCode, 'code', digitInfo);

        result = result.replace('USD', '').trim();

        return result;

    }
}
