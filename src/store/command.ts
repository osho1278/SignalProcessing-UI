import { action, makeAutoObservable } from "mobx";
import { items } from "./items";
import Payload from "../http/payload";
import { http } from "../http/http";
import {toast} from './toast' ;

class Commands {
    stageOutput: any = {}; 
    stageInput:any={}

    constructor() {
        makeAutoObservable(this);
    }

    @action
    execute=(node:any,params:any)=>{
        // if hht success 
        console.log("node id is ",node,params)
        items.updateNodeColor(node.id,'#00ff00')
        let inherited:any=[];
        items.getIncomers(node).forEach((item:any)=>{
            inherited.push(item.data.label)
            // console.log("Connected is = ",item.id);
        })

        console.log(inherited);
        
        let args:string=`-o ${node.data.label} --fs 25600 `
        let data:any={}

        console.log( Object.keys(params));
        
        Object.keys(params).forEach((element:any) => {
            
            let value:any= params[element].value;
            
            console.log("element =>>>>>>>>>",element)
            if(value){
                
                args+= `--${element} \"${value}\" `
            }
        });
        
        
        args+= `--inherited ${inherited}`
        // data["args"]=args;
        params["inherited"]=inherited
        params["output"]=node.data.label
        data["cmdName"]=node.data.label+".py";
        data["args"]=JSON.stringify(params);


        console.log(data)
        let payload:Payload={
            data:JSON.stringify(data),
            onSuccess:(data:any)=>{
                console.log("getCommandOutput data is ",data);
                toast.showToast("Command Success",`${JSON.stringify(data)}`,"success")


            },
            onFailure:()=>console.log("Failure")    
        }
        http.post('/command',payload)
    }

    getCommandOutput=(cmd:string)=>{

        if(!(cmd in this.stageOutput)){
            
        let payload:Payload={
            data:'',
            onSuccess:(data:any)=>{
                console.log("getCommandOutput data is ",data)
                this.stageOutput[cmd]=data
            },
            onFailure:()=>console.log("Failure")    
        }
        http.get('commandOutput?fileName='+cmd,payload)
        }
        // return this.stageOutput[cmd];
    }


    getCommandInputParams=(node:string)=>{
        let inherited='';
        // console.log("getCommandInputParams called");
        items.getIncomers(node).forEach((item:any)=>{
            inherited+=item.data.label+","
            console.log("Connected Param is is = ",item.id);
        })
        console.log("getCommandInputParams called",inherited);

        let payload:Payload={
            data:'',
            onSuccess:(data:any)=>{
                console.log("commandOutputParams data is ",data)
                toast.showToast("Get Command Input Params","Successfully Get Command Input Params","success")

                this.stageInput=data
            },
            onFailure:()=>{
                this.stageInput={}
                console.log("Failure")    
            }
        }
        if(inherited!=''){
            http.get(`commandOutputParams?fileName=${inherited}`,payload)
        }else{
            this.stageInput={}
        }

        // return this.stageOutput[cmd];
    }

   
}

export const cmd = new Commands();
