import axios, {api} from '@/api';

export var user = {
    get: function(params) {
        return axios.get(api.account.user,{
            params:params
        });
    },
    put: function(pk,params) {
        return axios.put(api.account.user + "/" + pk, params);
    },
    delete: function(pk) {
        return axios.delete(api.account.user + "/" + pk);
    },
    self: function() {
        return axios.get(api.account.userself);
    },
    login: function(params) {
        params["login_type"] = "account";
        return axios.post(api.account.login, params)
    },
    auth_google: function() {
        return axios.post(api.account.login, {login_type:"google"})
    },
    logout: function() {
        return axios.post(api.account.logout)
    },
    forget_password: function(params) {
        return axios.post(api.account.forget_password, params)
    }
};

export var group = {
    get: function(params) {
        return axios.get(api.account.group,{
            params:params
        });
    },
    put: function(pk,params) {
        return axios.put(api.account.group + "/" + pk, params);
    },
    post: function(params) {
        return axios.post(api.account.group, params);
    },
    delete: function(pk) {
        return axios.delete(api.account.group + "/" + pk);
    },
    self: function() {
        return axios.get(api.account.groupself);
    }
};

export var resource = {
    get: function() {
        return axios.get(api.account.resource);
    },
};
