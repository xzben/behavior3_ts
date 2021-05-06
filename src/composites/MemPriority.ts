import * as b3 from "../b3constant"
import { Composite } from "../core/Composite"
import { Tick } from "../core/Tick"

/*
    相当于条件 “或" 操作，只要一个成功就返回成功
    按顺序执行每个子节点，直到 其中一个子节点成功，或者全部执行完毕 
    允许存在延迟节点，遇到延时完成的节点会自动缓存，下次继续执行
*/
export class MemPriority extends Composite{
    constructor(params : any){
        super(params);
        this.name = "MemPriority";
    }

    public enter(tick: Tick): void {
 
    }
    public open(tick: Tick): void {
        tick.blackborad.set("runningChild", 0, tick.tree.id, this.id);
    }

    public tick(tick: Tick): b3.Status {
        let child = tick.blackborad.get("runningChild", tick.tree.id, this.id);
        for(let i = child; i < this.children.length; i++){
            let status = this.children[i]._execute(tick);

            if(status != b3.Status.FAILURE){
                if(status == b3.Status.RUNNING){
                    tick.blackborad.set("runningChild", i, tick.tree.id, this.id);
                }

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