class SelectObj {
    constructor(selectedId = -1) {
        this._values = [];
        this._cb = null;
        this._selectedId = selectedId;
    }

    addValue(value) {
        this._values.push(value);
        this._trySelectCurrent();
    }

    onSelectedChanged(cb) {
        this._cb = cb;
    }

    _trySelectCurrent() {
        if (this._selectedId > -1 && this._values.length - 1 >= this._selectedId) {
            this.changeSelected(this._selectedId);
        }
    }

    changeSelected(id) {
        this._selectedId = id;

        if(this._cb !== null) {
            this._cb(this._values[id], id);
        }

    }
}

export default SelectObj;