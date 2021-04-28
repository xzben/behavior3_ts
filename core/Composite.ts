import * as b3 from "../b3"
import {BaseNode} from "../core/BaseNode"

export abstract class Composite extends BaseNode{
    public children : BaseNode[] = [];

    constructor( params : any){
        super(params);
        this.category = b3.Category.COMPOSITE;
        this.children = (params.children || []).slice(0);
    }
}