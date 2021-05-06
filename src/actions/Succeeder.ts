import { Status } from "../b3constant";
import { Action } from "../core/Action"
import { Tick } from "../core/Tick";

export class Succeeder extends Action{
    constructor(params : any){
        super(params);
        this.name = "Succeeder";
    }

    public enter(tick: Tick): void {

    }

    public open(tick: Tick): void {

    }

    public tick(tick: Tick): Status {
        return Status.SUCCESS;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }


}