export class Tick{
    public tree : any = null;
    public debug : any = null;
    public target : any = null;
    public blackborad : any = null;
    public _openNodes : any[] = [];
    public _nodeCount = 0;

    public _enterNode( node : object){
        this._nodeCount++;
        this._openNodes.push(node)
    }

    public _openNode( node : object ){

    }

    public _tickNode( node :object){

    }

    public _closeNode( node : Object ){
        this._openNodes.pop();
    }

    public _exitNode( node : Object){
        
    }

    public getCurTime() : number{
        return (new Date()).getTime();
    }
}