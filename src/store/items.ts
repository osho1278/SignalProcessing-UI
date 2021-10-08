import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import ReactFlow, { Controls, updateEdge, addEdge, removeElements, getIncomers } from 'react-flow-renderer';
import { http } from "../http/http";
import Payload from "../http/payload";
import { toast } from "./toast";

// const elements = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
//     // you can also pass a React component as a label
//     { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
//     { id: 'e1-2', source: '1', target: '2', animated: true },
//   ];
class Items {
    @persist nodes: any[] = [];
    @persist allNodes: any[] = [];
    newItem: any;
    graphName: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    @action
    removeItems = (toRemove: any) => {
        this.nodes = removeElements([toRemove], this.nodes)
    }

    addEdge = (params: any) => {
        this.nodes = addEdge({
            ...params,
            label: 'Delete',
            // style:{width:10},
            animated: true, arrowHeadType: 'arrow'
        }, this.nodes)
    }

    addItems = (itemToAdd: any) => {
        console.log(itemToAdd.label)
        let lastAddedItem = this.nodes.length;
        let newItems = this.nodes.map(item => item);
        newItems.push({ id: `${lastAddedItem + 1}`, data: itemToAdd, position: { x: 100, y: lastAddedItem * 100 } });
        // if(this.lastAddedItem>0){

        //   //   newItems.push({ id: `e${this.lastAddedItem}-${this.lastAddedItem + 1}`, source: `${this.lastAddedItem}`, target: `${this.lastAddedItem + 1}`, animated: true });
        // }
        // this.lastAddedItem += 1;
        this.nodes = newItems.map(items => items);

        this.nodes.forEach(element => {
            console.log("id is", element.id)
        });
    }

    updateNodeColor = (nodeId: string, color: string) => {
        this.nodes = this.nodes.map((item: any) => {
            if (item.id === nodeId) {
                console.log("color changed", color);
                item.style = { ...item.style, backgroundColor: color }
            }
            return item;
        }
        )
    }

    updateLabel = (nodeId: string, label: string) => {
        this.nodes = this.nodes.map((item: any) => {
            if (item.id === nodeId) {
                console.log("label changed", label);
                item["data"]["label"] = label
            } else {
                console.log(item.id, nodeId)
            }
            return item;
        }
        )
    }

    getIncomers = (node: any) => {
        return getIncomers(node, this.nodes);
    }

    saveGraph = () => {

        let payload: Payload = {
            data: { "graph": JSON.stringify(this.nodes), "graphName": this.graphName },
            onSuccess: (data: any) => {
                // this.nodes=data.data;
                console.log("Success", data)
                // toast.showToast("Get Widgets From Server","Successfully Got Widgets from Server","success")
            },
            onFailure: () => console.log("Failure")
        }
        let graph = http.post("/graph", payload);
    }

    getGraph = () => {
        let payload: Payload = {
            data: '',
            onSuccess: (data: any) => {
                console.log("getGraph ", data)
                this.allNodes = data && data.output || [];
                console.log("Success", this.nodes)
                // toast.showToast("Get Widgets From Server","Successfully Got Widgets from Server","success")
            },
            onFailure: () => console.log("Failure")
        }
        let graph = http.get("/graph", payload);
        // console.log(widgets)
    }

    @action
    deleteGraph = (item: any) => {
        let payload:Payload = {
            data:{"id":item},
            onSuccess:(data:any)=>{
                // this.rules=data.data;
                console.log("Success",data)
                
                toast.showToast("Get Widgets From Server","Successfully Got Widgets from Server","success")
            },
            onFailure:()=>console.log("Failure")
        }
        let widgets = http.post("/deleteGraph",payload);
        console.log(widgets)
    }

}

export const items = new Items();
