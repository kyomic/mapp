import { NavMenu, INavMenu } from "./navmenu";

export interface IChannel{
    /**
     * 当前频道id
     */
    currentNavId:number|0,
    /**
     * 当前频道下的数据
     */
    currentBlock:Array<any>,
    /**
     * 导航数据
     */
    menu:Array<INavMenu> | [],
    /**
     * 所的频道数据
     */
    blocks?:any
}
export type Channel = IChannel;