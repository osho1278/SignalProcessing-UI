import { action, makeAutoObservable } from "mobx";
import { items } from "./items";
import Payload from "../http/payload";
import { http } from "../http/http";
import {toast} from './toast' ;
import { persist } from "mobx-persist";

class CodeEditor {
    @persist code: any = `

"""
To export any variable : 
use save(key,value) to save a variable 
use remove(key) to remove a variable
"""

`; 
    fileName:any={}
    successOutput:any={};
    failureOutput:string='';
    constructor() {
        makeAutoObservable(this);
    }

    tempSaveCode=(code:any)=>{
        this.code=code;
    }

    saveCode=async (code:any,fileName:any,params?:any)=>{
        let isSuccess:boolean=false;
        console.log("Returning : ",isSuccess);
        let payload:Payload={
            data:{"code": code,"fileName":fileName,...params},
            onSuccess:(data:any)=>{
                console.log("saveCode data is ",data)
                this.successOutput=data
                isSuccess=true;
            },
            onFailure:(data:any)=>{
                console.log("Failure",data)
                isSuccess=false
            }
        }
        await http.post('saveCode',payload)
        console.log("Returning : ",isSuccess);
        return isSuccess;
    }

    @action
    executeCode=async (params:any)=>{
        let payload:Payload={
            data:params,
            onSuccess:(data:any)=>{
                console.log("executeCode data is ",data)
                this.successOutput=data
            },
            onFailure:()=>{
                console.log("Failure")
                // this.successOutput=data
            }    
        }
        await http.post('command',payload)
    }  
}

export const codeEditor = new CodeEditor();
