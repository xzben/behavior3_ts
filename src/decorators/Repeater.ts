import * as b3 from "../b3constant"
import { Decorator } from "../core/Decorator"
import { Tick } from "../core/Tick"

/*
    循环执行指定次数
*/
export class Repeater extends Decorator {
    public maxLoop : number = -1;

    constructor(params:any){
        super(params);
        this.name = "Repeater";
        this.title = "Repeat <maxLoop>x";
        this.parameters = {
            maxLoop : -1
        }

        this.maxLoop = params.maxLoop || -1;
    }

    public enter(tick: Tick): void {
        
    }
    public open(tick: Tick): void {
        tick.blackborad.set("i", 0, tick.tree.id, this.id);
    }

    public tick(tick: Tick): b3.Status {
        if(!this.child){
            b3.Status.ERROR;
        }

        let i = tick.blackborad.get("i", tick.tree.id, this.id);
        let status = b3.Status.SUCCESS;

        while(this.maxLoop < 0 || i < this.maxLoop){
            status = this.child._execute(tick);

            if(status == b3.Status.SUCCESS || status == b3.Status.FAILURE){
                i++;
            }else{
                break;
            }
        }

        tick.blackborad.set("i", i, tick.tree.id, this.id);

        return status;
    }
    
    public close(tick: Tick): void {
        
    }
    public exit(tick: Tick): void {
        
    }
    
}