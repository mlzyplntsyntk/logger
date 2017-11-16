export abstract class model {
    static createFromObject<T>(t:new () => T, obj:{}) : model {
        console.log(obj);
        for (var a in obj) {
            if (t[a])
                t[a] = obj[a];
        }
        return t;
    }
}