type TreeMemory = {
    nodeMemory : Map<string,any>,
    openNodes : string[],
    traversalDepth : number,
    traversalCycle : number,
}

export class Blackboard{
    private m_baseMemory : any = {};
    private m_treeMemory : Map<string, TreeMemory> = new Map();

    private _getTreeMemory( treeScope : string) : TreeMemory{
        let tree : TreeMemory | undefined = this.m_treeMemory.get(treeScope);
        if(tree == null){
            tree = { 
                nodeMemory : new Map(),
                openNodes : [],
                traversalCycle : 0,
                traversalDepth : 0,
            };

            this.m_treeMemory.set(treeScope, tree);
        }

        return tree
    }

    private _getNodeMemory( treeMemory : TreeMemory, nodeScopre : string) : any{
        let memory = treeMemory.nodeMemory;
        let value = memory.get(nodeScopre);
        if(value == null){
            value = {};
            memory.set(nodeScopre, value);
        }
        return value;
    }

    private _getMemory( treeScope ?: string , nodeScope ?: string) : any{
        let memory = this.m_baseMemory;
        if(treeScope){
            memory = this._getTreeMemory(treeScope);
        }

        if(nodeScope){
            memory = this._getNodeMemory(memory, nodeScope);
        }

        return memory;
    }

    public set( key : string, value : any, treeScope ?: string, nodeScope ?: string){
        let memory = this._getMemory(treeScope, nodeScope);
        memory[key] = value;
    }

    public get( key : string, treeScope ?: string, nodeScope ?: string ) : any{
        let memory = this._getMemory(treeScope, nodeScope);
        return memory[key];
    }
}