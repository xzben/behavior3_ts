import * as b3 from "../b3constant"
import { Decorator } from "../core/Decorator"
import { Tick } from "../core/Tick"

/*
    装饰节点，每次执行一次，但是生命周期中只能执行指定次数
*/
export class Limiter extends Decorator {
    public maxLoop : number = 1;

    constructor(params:any){
        super(params);
        this.name = "Limiter";
        this.title = "Limit <maxLoop> Activations"
        this.parameters = {
            maxLoop : 1
        }

        this.maxLoop = params.maxLoop;
    }

    public enter(tick: Tick): void {
        
    }
    public open(tick: Tick): void {
        tick.blackborad.set("i", 0, tick.tree.id, this.id);
    }

    public tick(tick: Tick): b3.Status {
        if( !this.child){
            return b3.Status.ERROR;
        }

        let i = tick.blackborad.get("i", tick.tree.id, this.id);
        if(i < this.maxLoop){
            let status = this.child._execute(tick);

            if(status == b3.Status.SUCCESS || status == b3.Status.FAILURE){
                tick.blackborad.set("i", i+1, tick.tree.id, this.id);
            }

            return status;
        }

        return b3.Status.FAILURE;
    }
    
    public close(tick: Tick): void {
        
    }
    public exit(tick: Tick): void {
        
    }
    
}