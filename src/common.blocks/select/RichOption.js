class RichOption {
    constructor(value, quantity = null) {
        this._value = value;
        this._quantity = quantity;
        this._cb = () => {};
    }

    get getValue() {
        return this._value;
    }

    get getQuantity() {
        return this._quantity;
    }

    set setQuantity(quantity) {
        this._quantity = quantity;
        this._cb(quantity);
    }

    onQuantityChanged(cb) {
        this._cb = cb;
    }

    addQuantity() {
        if (this._quantity === null) this._quantity = 0;

        this._quantity++;

        this._cb(this._quantity);
    }

    substractQuantity() {
        if (this._quantity === null) this._quantity = 0;

        const tempQ = this._quantity - 1;
        if (tempQ < 0) {
            this._quantity = 0;
            this._cb(this._quantity);
            return;
        }

        this._quantity--;
        this._cb(this._quantity);
    }

    hasQuantity() {
        if (this._quantity !== null && this._quantity > 0) {
            return true;
        }

        return false;
    }
}

export default RichOption;