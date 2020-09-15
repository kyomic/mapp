import { USERINFO_UPDATE, USERINFO_UPDATE_SYNC, NAVLIST_INIT, NAVLIST_UPDATE, NAVLIST_UPDATE_CHANNEL } from '../../constants/index';
import { IChannel, Channel } from '../../types/channel';

export function channels( state:Channel = { currentNavId:0,menu:[],blocks:[],currentBlock:[] }, action:any ):any{
    switch( action.type ){
        /** 导航数据更新完毕 */
        case NAVLIST_UPDATE:
            console.log('update', action)
            state = Object.assign({}, state );
            state.menu = action.payload || [];
            if( !state.currentNavId ){
                state.currentNavId = state.menu[0].nav_id;
            }
            break;
        /** 导航对应的页面数据 */
        case NAVLIST_UPDATE_CHANNEL:
            state = Object.assign({}, state );
            state.currentNavId = action.payload.nav_id;
            state.currentBlock = action.payload.blocks;
            state.blocks = state.blocks || {}

            state.blocks[ state.currentNavId ] = state.currentBlock.concat()
            break;
    }
    return state;
}
