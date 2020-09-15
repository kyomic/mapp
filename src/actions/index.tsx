import { USERINFO_UPDATE, INCREMENT_ASYNC, NAVMENU_CHANGE, NAVMENU_INIT, USERINFO_UPDATE_SYNC } from '../constants/index'
export interface IUserAction {
    type:string,
    payload?:any
}

export interface IAppAction{
    type:string, 
    payload?:any
}
/** 用户交互（登录） */
export type UserAction = IUserAction;
/** 应用程序（菜单载入，页面载入） */
export type AppAction = IAppAction;





export const update = ( ):IUserAction =>({
    type: USERINFO_UPDATE,
    payload:{}
})

export const update2 = ():IUserAction =>({
    type:USERINFO_UPDATE_SYNC,
    payload:{}
})


export const initMenu = ()=>({
    type:NAVMENU_INIT,
})

export const loadMenu = ( channel_id:number =0 )=>({
    type: NAVMENU_CHANGE, 
    data: channel_id
})

export async function loadmenu(url: string): Promise<any> {
    var promise = new Promise<any>(resolve => {
       setTimeout(()=>{
            resolve(["home","vplay","pay"])
       },3000)
    });
    return promise;
}
