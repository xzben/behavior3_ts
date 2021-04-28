import { Status } from "../b3";
import { Action } from "../core/Action"
import { Tick } from "../core/Tick";

export class Failer extends Action{
    constructor(params : any){
        super(params);
        this.name = "Failer";
    }

    public enter(tick: Tick): void {

    }

    public open(tick: Tick): void {

    }

    public tick(tick: Tick): Status {
        return Status.FAILURE;
    }

    public close(tick: Tick): void {

    }
    public exit(tick: Tick): void {

    }


}