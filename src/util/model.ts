export abstract class model {
    constructor(props:any) {
    	    for (let k in props) {
    	        this[k] = props[k];
    	    }
    }
}