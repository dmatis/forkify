import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        if (index !== -1) {
            // [2,4,8].splice(1,1) -> mutates the array, removing element at 1st index
            this.items.splice(index, 1);
        }
    }

    updateCount (id, newCount) {
        const item = this.items.find((el) => el.id === id);
        if (item) {
            item.count = newCount;
        }
    }
}