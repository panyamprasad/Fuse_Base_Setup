//Generic type to render key/value pairs.
export class SelectOption {
    constructor(value, label?) {
        this._value = value;
        this._label = label || value;
    }

    private _value;

    get value() {
        return this._value;
    }

    private _label;

    get label() {
        return this._label;
    }
}
