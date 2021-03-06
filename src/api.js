import axios from 'axios';
import Vue from './main'
import {HTTP} from '@/utils'

axios.defaults.baseURL = '/';
if(window.location.host === "127.0.0.1:8080"){
    axios.defaults.baseURL = 'http://127.0.0.1:8877';
}
axios.defaults.timeout = 10000;
axios.interceptors.response.use(
    response =>{
        return response
    },
    error => {
        if (error.response && error.response.status === 401){
            Vue.$router.push("/");
            Vue.$store.commit("LOGIN_STATUS",false);
            HTTP.ERROR(Vue,"login required");
        }else{
            HTTP.ERROR(Vue,error)
        }
    }
    );


export default axios;

export var api = {
    default: function(p) {
        return {
            get: function(params) {
                return axios.get(p,{
                    params:params
                });
            },
            post: function(params) {
                return axios.post(p, params);
            },
            delete: function(pk) {
                return axios.delete(p + "/" + pk);
            },
            put: function(pk,params) {
                return axios.put(p + "/" + pk, params);
            },
            getItem: function(pk,params) {
                return axios.get(p + "/" + pk, params)
            }
        };
    },
    wx: {
        client:"/wx/client"
    },
};
