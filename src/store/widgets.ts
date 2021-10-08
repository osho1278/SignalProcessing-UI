import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { http } from "../http/http";
import Payload from "../http/payload";
import {toast} from './toast';

class Widgets {
    rules:any={}
    newItem: any;
    lastAddedItem: number = 2;
    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
    }


    getWidgetsFromServer=()=>{
        let payload:Payload = {
            data:'',
            onSuccess:(data:any)=>{
                this.rules=data.data;
                console.log("Success",data)
                toast.showToast("Get Widgets From Server","Successfully Got Widgets from Server","success")
            },
            onFailure:()=>console.log("Failure")
        }
        let widgets = http.get("/widgets",payload);
        console.log(widgets)
    }

    @action
    removeItems = (item: any) => {
        
    }

    @action
    addItems = (item: any) => {

    }
}

export const widgets = new Widgets();
