import * as b3 from "../b3constant"
import {BaseNode} from "../core/BaseNode"

export abstract class Condition extends BaseNode{
    constructor(params : any){
        super(params);
        this.category = b3.Category.CONDITION;
    }
}