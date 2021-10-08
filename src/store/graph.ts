import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import Payload from "../http/payload";
import {http} from '../http/http';
import { toast } from "./toast";

class Graph {
    data: any; 
  
    constructor() {
        makeAutoObservable(this);
    }
    
    getData=(node:any)=>{
        let payload:Payload = {
            data:'',
            onSuccess:(data:any)=>{
                this.data=data;
                console.log("Success",this.data)
            },
            onFailure:()=>console.log("Failure")
        }
        let widgets = http.get(`/visualizeData?stage=${node}`,payload);
        console.log(widgets)
    }

}

export const graph = new Graph();
