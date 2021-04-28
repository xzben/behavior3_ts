import { Status } from "../b3";
import { Action } from "../core/Action"
import { Tick } from "../core/Tick";

export class Wait extends Action{
    public endTime : number = 0;

    constructor(params : any){
        super(params);
        this.name = "Wait";
        this.title = "Wait <milliseconds>ms";
        this.parameters = { 
            milliseconds : 0,
        }

        this.endTime = params.milliseconds || 0;
    }

    public enter(tick: Tick): void {

    }

    public open(tick: Tick): void {
        let startTime = tick.getCurTime();
        tick.blackborad.set("startTime", startTime, tick.tree.id, this.id);
    }

    public tick(tick: Tick): Status {
        let currtime = tick.getCurTime();
        let startTime = tick.blackborad.get("startTime", tick.tree.id, this.id);

        if(currtime - startTime > this.endTime){
            return Status.SUCCESS;
        }
        
        return Status.RUNNING;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }


}