import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { http } from "../http/http";
import Payload from "../http/payload";

class Toast {
    message:string='';
    type:string='';  
    header:string='';
    show:boolean=false
    constructor() {
        makeAutoObservable(this);
    }
    
    @action.bound
    toggleShow=()=>{
        console.log("data has changed");
        this.show = !this.show;
    }

    showToast=(header:string,message:string,type:string)=>{
        this.header=header;
        this.message=message;
        this.type=type;
        this.show=true;
    }
}

export const toast = new Toast();