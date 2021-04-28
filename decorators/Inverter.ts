import * as b3 from "../b3"
import { Decorator } from "../core/Decorator"
import { Tick } from "../core/Tick"

/*
    相当于 条件 “非” 操作，执行装饰节点结果取反
*/
export class Inverter extends Decorator {
    constructor(params:any){
        super(params);
        this.name = "Inverter";

    }
    public enter(tick: Tick): void {
        
    }
    public open(tick: Tick): void {
        
    }
    public tick(tick: Tick): b3.Status {
        if(!this.child){
            b3.Status.ERROR;
        }

        let status = this.child._execute(tick);

        if(status == b3.Status.SUCCESS){
            status = b3.Status.FAILURE;
        }else if(status == b3.Status.FAILURE){
            status = b3.Status.SUCCESS;
        }

        return status;
    }
    
    public close(tick: Tick): void {
        
    }
    public exit(tick: Tick): void {
        
    }
    
}