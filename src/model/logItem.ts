
export class logItem {
    key:string;
    
    constructor(properties:{}) {
        this.key = properties["key"] || "";
    }
}