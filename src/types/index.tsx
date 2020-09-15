import { IUserAction } from "../actions";
import { IChannel } from "./channel";
/**
 * 基础用户信息
 */
interface BaseInfo{
    nickname?:string,
    realname?:string,
    openid?:string,
    user_icon?:Object,
    user_id?:number, 
    user_name?:string,
}

/**
 * VIP信息
 */
interface VIPInfo{
    coupon_num?:number | 0,
    ticket_num?:number | 0,
    endtm?:string,
    is_vip?:string,
    vip?:VIPDetail,
}
interface VIPDetail{
    endtm?:string,
    icon?:string,
    name?:string,
    vip_class?:string
}
/** 用户信息 */

export interface IUserInfo{
    user_id?:number | 0,
    token?:string | '',
    name?:string | '',
    base?:BaseInfo | null,
    vip?:VIPInfo | null
}

export interface INavMenu{
    currentId?:number | 0,
    //menu:[<name:string, link:string>]:[],
}

export type UserInfo = IUserInfo
export type Channel = IChannel;