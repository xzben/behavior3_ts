import * as b3 from "../b3constant"
import { Tick } from "./Tick"

export abstract class BaseNode{
    public id : string;
    public name : string = "";
    public category : b3.Category = null!;
    public title : string = "";
    public description : string = null!;
    public parameters : any = null;
    public properties : any = null;

    constructor( params : any){
        this.id = b3.CreateUUID();
        this.title = this.title || this.name;
        this.description =  "";
        this.parameters = {}
        this.properties = {}
    }

    public abstract enter(tick:Tick) : void;
    public abstract open(tick:Tick) : void;
    public abstract tick(tick:Tick) : b3.Status;
    public abstract close(tick:Tick) : void;
    public abstract exit(tick:Tick) : void;

    public _execute( tick : Tick ) : b3.Status{
        this._enter(tick);

        if(!tick.blackborad.get("isOpen", tick.tree.id, this.id)){
            this._open(tick);
        }

        let status = this._tick(tick);

        if(status != b3.Status.RUNNING){
            this._close(tick);
        }

        this._exit(tick);

        return status;
    }

    public _enter( tick : Tick){
        tick._enterNode(this);
        this.enter(tick);
    }

    public _open( tick : Tick){
        tick._openNode(this);
        tick.blackborad.set("isOpen", true, tick.tree.id, this.id);
        this.open(tick);
    }

    public _tick(tick : Tick) : b3.Status{
        tick._tickNode(this);
        return this.tick(tick);
    }

    public _close( tick : Tick){
        tick._closeNode(this);
        tick.blackborad.set("isOpen", false, tick.tree.id, this.id);
        this.close(tick);
    }

    public _exit( tick :Tick){
        tick._exitNode(this);
        this.exit(tick);
    }
}