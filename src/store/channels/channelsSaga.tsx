import {call, delay, put, takeEvery } from 'redux-saga/effects';
import api from '../../services/api';

import { USERINFO_UPDATE, USERINFO_UPDATE_SYNC, NAVLIST_INIT, NAVLIST_UPDATE, NAVLIST_LOAD_ITEM, NAVLIST_UPDATE_CHANNEL } from '../../constants/index';
import { NavMenuData } from '../../types/navmenu';

export function* update(){
    yield delay( 2000 )
    console.log('after delay')
    yield put( { type:USERINFO_UPDATE } )
}


export function* loadNavList(){
    try {
        let data = yield call(api.get_nav);
        if( data && data.retcode == 200 ){
            yield put({type: NAVLIST_UPDATE, payload:data.channels||[] });
        }
        
     } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
     }
}
export function* loadNavItem( action:any ){
    try {
        let data:any = yield call(api.get_nav_item, {nav_id:action.payload} );
        if( data && data.retcode == 200 ){
            let menudata:NavMenuData = {
                nav_id: action.payload,
                blocks: data.blocks||[]
            }
            yield put({type: NAVLIST_UPDATE_CHANNEL, payload:menudata });
        }        
     } catch (e) {
     }
}

export default function* channelsSaga(){
    yield takeEvery( USERINFO_UPDATE_SYNC , update);
    yield takeEvery( NAVLIST_INIT, loadNavList );
    yield takeEvery( NAVLIST_LOAD_ITEM, loadNavItem );
}