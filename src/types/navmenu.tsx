export interface INavMenu{    
    id:number | 0,    
    name:string, 
    nav_id:number | 0,
    code?:string,
    templete?:string, 
    url?:string
}

export interface INavMenuData{
    nav_id?:number,
    blocks:Array<any>
}
export type NavMenu = INavMenu
export type NavMenuData = INavMenuData