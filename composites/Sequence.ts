import * as b3 from "../b3"
import { Composite } from "../core/Composite"
import { Tick } from "../core/Tick"

/*
    相当于条件判断的  "与” 操作，要全部成功才返回成功
    按循序执行每个子节点，直到遇到不成功的节点则中断返回，或者全部执行结束返回最后节点的状态
    每次都会从头开始运行子节点，所以不能存在延时子节点
*/
export class Sequence extends Composite{
    constructor(params : any){
        super(params);
        this.name = "Sequence";
    }

    public enter(tick: Tick): void {
 
    }
    public open(tick: Tick): void {
        
    }

    public tick(tick: Tick): b3.Status {
       for(let i = 0; i < this.children.length; i++){
           let status = this.children[i]._execute(tick);

           if(status != b3.Status.SUCCESS){
               return status;
           }
       }

       return b3.Status.SUCCESS;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }
    
}