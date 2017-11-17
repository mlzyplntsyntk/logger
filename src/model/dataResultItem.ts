import {model} from '../util/model';

export class dataResultItem extends model {
    status:boolean;
    message:string;
    data:any;

    static success(message?:string, data?:any|null) : dataResultItem {
        return new dataResultItem({
            status : true,
            message : message,
            data : data
        });
    } 
}