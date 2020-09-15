import { stringify } from 'qs';
import request from '../lib/request'
import config from '../lib/config'

let poseidon_params = {
    fudid:config.fudid,
    ves:config.ves,
    cl:config.cl,
    uc:config.uc,
}

export async function get_nav( params:any = {} ) {
    params = Object.assign({}, poseidon_params, params );
    return await request(`/po/v7/config/channel?${stringify(params)}`);
}


export async function get_nav_item( params:any = {}){
    params = Object.assign({}, poseidon_params, params );
    params.pg = 1;
    return await request(`/po/v10/config/channelhome?${stringify(params)}`);
}

let api = {
    get_nav, get_nav_item
}
  
export default api;