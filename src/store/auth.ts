import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { http } from "../http/http";
import Payload from "../http/payload";
import { create,persist } from "mobx-persist";
import axios from 'axios';

class Auth {
    @persist @observable authToken:string='';
    message:string='';


    constructor() {
        makeAutoObservable(this);
    }

    login=(data:any)=>{
        let payload:Payload = {
            data:data,
            onSuccess:(data:any)=>{
                console.log("Success",data)
                var token=`Bearer ${data}`
                // localStorage.setItem("token", `Bearer ${JSON.stringify(data)}`)
                console.log("Login success")
                axios.defaults.headers.common['Authorization'] = token;
                this.authToken=token;

            },
            onFailure:(data:any)=>{
                this.message="Username or password is wrong";
                console.log("Failure",data)
            }
        }
        http.post("/login",payload);
    }

    logout=()=>{
        this.authToken='';
        let payload:Payload = {
            data:'',
            onSuccess:(data:any)=>{
                console.log("Success",data)
                
            },
            onFailure:(data:any)=>console.log("Failure",data)
        }
        // http.post("/logout",payload);
    }

    isTokenValid=()=>{
        let authToken:any=localStorage.getItem("token") || '' ;
        console.log('Token : ',authToken);
        if(authToken!=''){
            console.log("valid token");
            return true;
        }
        console.log("invalid token");
        return false;
    }

}
const hydrate = create({
    storage: localStorage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: false  // if you use AsyncStorage, here shoud be true
                    // default: true
})

export const auth = new Auth();
hydrate('auth', auth)
    // post hydration
    .then(() =>{ 
     console.log('some hydrated')
    })