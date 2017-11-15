export abstract class model {
    static createFromObject(obj:{}) : model {
        for (var a in obj) {
            this[a] = obj[a];
        }
        return this;
    }
}