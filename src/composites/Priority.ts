import * as b3 from "../b3"
import { Composite } from "../core/Composite"
import { Tick } from "../core/Tick"

/*
    相当于条件 “或" 操作，只要一个成功就返回成功
    按循序执行子节点，直到遇到一个子节点不失败则中断返回，或者全部执行结束返回最后一个节点的结果
    每次都会从头开始运行子节点，所以不能存在延时子节点
*/
export class Priority extends Composite{
    constructor(params : any){
        super(params);
        this.name = "Priority";
    }

    public enter(tick: Tick): void {
 
    }
    public open(tick: Tick): void {
        
    }

    public tick(tick: Tick): b3.Status {
       for(let i = 0; i < this.children.length; i++){
           let status = this.children[i]._execute(tick);

           if(status != b3.Status.FAILURE){
               return status;
           }
       }

       return b3.Status.FAILURE;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }
    
}