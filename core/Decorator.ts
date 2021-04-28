import * as b3 from "../b3"
import {BaseNode} from "../core/BaseNode"

export abstract class Decorator extends BaseNode{
    public child : BaseNode = null!;
    
    constructor( params : any){
        super(params)
        this.category = b3.Category.DECORATOR;
        this.child = params.child || null;
    }
}