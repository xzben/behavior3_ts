import * as b3 from "../b3constant"
import { Decorator } from "../core/Decorator"
import { Tick } from "../core/Tick"

/*
    主要配合 延时节点 使用，限制运行时间
    一直重试子节点，直到超过指定时间
*/
export class MaxTime extends Decorator {
    public maxTime : number = 0;

    constructor(params:any){
        super(params);
        this.name = "MaxTime";
        this.title = "Max <maxTime>ms";
        this.parameters = {
            maxTime : 0
        }
        if(!params.maxTime){
            throw "maxTime parameter in MaxTime decorator is an obligatory parameter";
        }
        this.maxTime = params.maxTime;

    }
    public enter(tick: Tick): void {
        
    }
    public open(tick: Tick): void {
        let startTime = tick.getCurTime();
        tick.blackborad.set("startTime", startTime, tick.tree.id, this.id);
    }

    public tick(tick: Tick): b3.Status {
        if(!this.child){
            b3.Status.ERROR;
        }

        let curtime = tick.getCurTime();
        let startTime = tick.blackborad.get("startTime", tick.tree.id, this.id);

        let status = this.child._execute(tick);
        if(curtime - startTime > this.maxTime){
            return b3.Status.FAILURE;
        }

        return status;
    }
    
    public close(tick: Tick): void {
        
    }
    public exit(tick: Tick): void {
        
    }
    
}