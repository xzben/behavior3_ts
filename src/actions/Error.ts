import { Status } from "../b3constant";
import { Action } from "../core/Action"
import { Tick } from "../core/Tick";

export class Error extends Action{
    constructor(params : any){
        super(params);
        this.name = "Error";
    }

    public enter(tick: Tick): void {

    }

    public open(tick: Tick): void {

    }

    public tick(tick: Tick): Status {
        return Status.ERROR;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }


}