import * as b3 from "../b3"
import {BaseNode} from "../core/BaseNode"

export abstract class Action extends BaseNode{
    constructor( params : any){
        super(params);
        this.category = b3.Category.ACTION;
    }
}