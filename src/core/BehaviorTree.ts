import * as b3 from "../b3"
import { BaseNode } from "./BaseNode";
import * as Decorators from '../decorators';
import * as Composites from '../composites';
import * as Actions from '../actions';
import { Tick } from './Tick';
import { Blackboard } from "./Blackboard";

type CLS_NEW = new( properties : any)=>Object;

export class BehaviorTree{
    public id : string = null!;
    public title : string = null!;
    public description : string = null!;
    public properties : any = null;
    public root : BaseNode = null!;
    public debug : Object = null!;

    constructor(){
        this.id = b3.CreateUUID();
        this.title = "The behavior tree";
        this.description = "default description";
        this.properties = {}
        this.root = null!;
        this.description = null!;
    }

    public load(data : any, names : any){
        names = names || {};

        this.title = data.title || this.title;
        this.description = data.description || this.description;
        this.properties = data.properties || this.properties;

        let nodes : any = {}
        for(let id in data.nodes){
            let spec = data.nodes[id];
            let Cls : CLS_NEW = null!;

            if(spec.name in names){
                Cls = names[spec.name];
            }else if(spec.name in Decorators){
                Cls = (Decorators as any)[spec.name];
            }else if(spec.name in Composites){
                Cls = (Composites as any)[spec.name];
            }else if(spec.name in Actions){
                Cls = (Actions as any)[spec.name];
            }else{
                throw new EvalError('BehaviorTree.load: Invalid node name + "'+
                            spec.name+'".');
            }

            let node : any = new Cls(spec.properties);
            node.id = spec.id || node.id;
            node.title = spec.title || node.title;
            node.description = spec.description || node.description;
            node.properties = spec.properties || node.properties;
            nodes[id] = node;
        }

        for (let id in data.nodes) {
            let spec = data.nodes[id];
            let node = nodes[id];
      
            if(node.category === b3.Category.COMPOSITE && spec.children){
                for (var i=0; i<spec.children.length; i++){
                    var cid = spec.children[i];
                    node.children.push(nodes[cid]);
                }
            }else if(node.category === b3.Category.DECORATOR && spec.child) {
                node.child = nodes[spec.child];
            }
          }
          this.root = nodes[data.root];
    }

    public dump(){
        let data : any = {};
        let customNames = [];
        data.title        = this.title;
        data.description  = this.description;
        data.root         = (this.root)? this.root.id:null;
        data.properties   = this.properties;
        data.nodes        = {};
        data.custom_nodes = [];

        if (!this.root) return data;

        let stack = [this.root];
        while (stack.length > 0) {
            let node : any = stack.pop();

            let spec : any = {};
            spec.id = node.id;
            spec.name = node.name;
            spec.title = node.title;
            spec.description = node.description;
            spec.properties = node.properties;
            spec.parameters = node.parameters;

            // verify custom node
            let proto = (node.constructor && node.constructor.prototype);
            let nodeName = (proto && proto.name) || node.name;

            if (!(Decorators as any)[nodeName] && !(Composites as any)[nodeName] && !(Actions as any)[nodeName] && customNames.indexOf(nodeName) < 0) {
                let subdata : any = {};
                subdata.name = nodeName;
                subdata.title = (proto && proto.title) || node.title;
                subdata.category = node.category;

                customNames.push(nodeName);
                data.custom_nodes.push(subdata);
            }

            // store children/child
            if (node.category === b3.Category.COMPOSITE && node.children) {
                let children = [];
                for (let i=node.children.length-1; i>=0; i--) {
                    children.push(node.children[i].id);
                    stack.push(node.children[i]);
                }
                spec.children = children;
            }else if(node.category === b3.Category.DECORATOR && node.child) {
                stack.push(node.child);
                spec.child = node.child.id;
            }
            data.nodes[node.id] = spec;
        }

        return data;
    }

    public createTick() : Tick{
        return new Tick();
    }
    
    public tick( target : object, blackboard : Blackboard) : b3.Status{
        let tick = this.createTick();

        tick.debug = this.debug;
        tick.target = target;
        tick.blackborad = blackboard;
        tick.tree = this;

        let state = this.root._execute(tick);

        let lastOpenNodes = blackboard.get("openNodes", this.id);
        let currOpenNodes = tick._openNodes.slice(0);

        let start = 0;
        for(let i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++){
            start = i+1;
            if(lastOpenNodes[i] !== currOpenNodes[i]){
                break;
            }
        }

        for(let i = lastOpenNodes.length-1; i >= start; i--){
            lastOpenNodes[i]._close(tick);
        }

        blackboard.set('openNodes', currOpenNodes, this.id);
        blackboard.set('nodeCount', tick._nodeCount, this.id);
    
        return state;
    }
}