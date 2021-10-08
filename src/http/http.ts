import Payload from "./payload"
import axios from 'axios';
import { auth } from "../store/auth";
import { observer } from "mobx-react";
const BASE_URL = "http://127.0.0.1:5000"
axios.defaults.baseURL = BASE_URL;
if (localStorage.getItem('auth') != null) {
    var data = JSON.parse(localStorage.getItem('auth') || '') || {}
    axios.defaults.headers.common['Authorization'] = data && data['authToken']
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Http {
    get = async (url: string, payload: Payload) => {
        console.log("URL : ", url)
        let result = await axios.get(url);
        try {
            if (result.status == 200) {
                payload.onSuccess(result.data);
            } else {
                payload.onFailure();
            }
        }
        catch (e) {
            payload.onFailure();
            console.log("HTTP POST Exceptiopn")
        }
    }
    post = async (url: string, payload: Payload) => {
        console.log("URL : ", url)
        try {
            let result = await axios.post(url, payload.data);
            console.log(result)
            if (result.status == 200 || result.status == 201) {
                payload.onSuccess(result.data);
                return true
            } else {
                payload.onFailure();
                return false
            }
        } catch (e) {
            payload.onFailure();
            console.log("HTTP POST Exceptiopn")
        }
    }
    uploadFile = async (url: string, payload: any) => {
        console.log("URL : ", url, payload)
        try {
            let result = await axios.post(url, payload.file, { headers: { "Content-Type": "multipart/form-data" } });
            console.log(result)
            if (result.status == 200 || result.status == 201) {
                payload.onSuccess(result.data);
                return true
            } else {
                payload.onFailure();
                return false
            }
        } catch (e) {
            payload.onFailure();
            console.log("HTTP POST Exceptiopn")
        }
    }
}

export const http = new Http();