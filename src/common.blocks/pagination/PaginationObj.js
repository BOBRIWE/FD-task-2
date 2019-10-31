class PaginationObj {
    constructor(max, maxSpace) {
        this._values = [];
        this._max = max;
        this._maxSpace = maxSpace;

        this._prev = 'p';
        this._next = 'n';
        this._current = 'c';


        for (let i = 0; i < this._maxSpace; i++) {
            this._values.push()
        }
    }
}

export default PaginationObj;