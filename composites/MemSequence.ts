import * as b3 from "../b3"
import { Composite } from "../core/Composite"
import { Tick } from "../core/Tick"

/*
    相当于条件判断的  "与” 操作，要全部成功才返回成功
    按顺序执行，直到子节点成功或全部执行完毕
    允许存在延迟节点，遇到延时完成的节点会自动缓存，下次继续执行
*/
export class MemSequence extends Composite{
    constructor(params : any){
        super(params);
        this.name = "MemSequence";
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

            if(status != b3.Status.SUCCESS){
                if(status == b3.Status.RUNNING){
                    tick.blackborad.set("runningChild", i, tick.tree.id, this.id);
                }

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