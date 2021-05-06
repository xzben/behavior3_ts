import * as b3 from "../b3constant"
import { Decorator } from "../core/Decorator"
import { Tick } from "../core/Tick"

/*
    循环尝试子节点，直到失败或超过指定次数
*/
export class RepeatUntilFailure extends Decorator {
    public maxLoop : number = -1;

    constructor(params:any){
        super(params);
        this.name = "RepeatUntilFailure";
        this.title = "Repeat Until Failure";

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
        let status = b3.Status.ERROR;

        while(this.maxLoop < 0 || i < this.maxLoop){
            status = this.child._execute(tick);

            if(status == b3.Status.SUCCESS){
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