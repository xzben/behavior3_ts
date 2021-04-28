import { Status } from "../b3";
import { Action } from "../core/Action"
import { Tick } from "../core/Tick";

export class Runner extends Action{
    constructor(params : any){
        super(params);
        this.name = "Runner";
    }

    public enter(tick: Tick): void {

    }

    public open(tick: Tick): void {

    }

    public tick(tick: Tick): Status {
        return Status.RUNNING;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }


}