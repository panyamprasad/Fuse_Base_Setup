import { Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';

@Directive({
  selector: 'input[amountFormatter]',
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: AmountFormatterDirective },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountFormatterDirective),
      multi: true
    }
  ]
})
export class AmountFormatterDirective implements ControlValueAccessor {
  private locale = 'en';
  private decimalMarker: string = '.';
  public regexPattern: RegExp = /^[+-]?([0-9,]*[.])?[0-9]+$/g;
  constructor(private element: ElementRef<HTMLInputElement>) {

  }

  private _value: string | any;

  get value(): string | null {

    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  @HostListener('input', ['$event.target.value'])
  input(value) {
    //Find all numerics, decimal marker(, or .) and -
    //It will delete thousandSeparator cos it's always opposite to decimal marker

    /** Prohibits characters except the numbers line number 46-57*/
    const amountFieldValue: any = value;

    if (!amountFieldValue.match(this.regexPattern)) {

      this.element.nativeElement.value = amountFieldValue.replace(/[^\d.]/g, '');

      this._value = amountFieldValue.replace(/[^\d.]/g, '');

      value = amountFieldValue.replace(/[^\d.]/g, '');

    }

    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    //Separate value on before and after decimal marker
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);

    //Send non localized value, with dot as decimalMarker to API
    this._value = decimal ? integer.concat('.', decimal) : integer;

    // If decimal separator is last character don't update
    // because it will delete . || ,
    if (this.isLastCharacterDecimalSeparator(value)) {
      this._value = value;
    }

    // here to notify Angular Validators
    this._onChange(this._value ? parseFloat(this._value) : this._value);

  }

  @HostListener('blur')
  _onBlur() {
    /**
     * Adding thousand separators
     */
    this.formatValue(this._value);
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  _onChange(value: any): void { }

  /**
   * @param value
   * apply formatting on value assignment
   */
  writeValue(value: any) {
    this._value = value;

    this.formatValue(this._value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() { }

  isLastCharacterDecimalSeparator(value: any) {
    return isNaN(value[value.length - 1]);
  }


  private formatValue(value: string | null) {
    if (value === null) {
      this.element.nativeElement.value = '';
      return;
    }

    if (this.isLastCharacterDecimalSeparator(value)) {
      this.element.nativeElement.value = value;
      return;
    }

    // Conclude the decimal and thousand separators from locale
    const [thousandSeparator, decimalMarker] = formatNumber(1000.99, this.locale).replace(/\d/g, '');
    this.decimalMarker = decimalMarker;

    //Here value should always come with . as decimal marker thus any other behavior is bug
    const [integer, decimal] = value.split('.');

    //Group every three elements, and add thousandSeparator after them
    this.element.nativeElement.value = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    //Add decimals and decimalMarker if any
    if (decimal) {
      this.element.nativeElement.value = this.element.nativeElement.value.concat(decimalMarker, decimal);
    }
  }

  private unFormatValue() {
    const value = this.element.nativeElement.value;
    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);

    this._value = decimal ? integer.concat('.', decimal) : integer;
    if (value) {
      this.element.nativeElement.value = this._value;
    } else {
      this.element.nativeElement.value = '';
    }
  }

}