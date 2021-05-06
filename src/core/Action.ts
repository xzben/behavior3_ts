
import { Category } from "../b3constant";
import {BaseNode} from "../core/BaseNode"

export abstract class Action extends BaseNode{
    constructor( params : any){
        super(params);
        this.category = Category.ACTION;
    }
}