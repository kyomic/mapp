import { UserAction } from '../../actions';
import { USERINFO_UPDATE, USERINFO_UPDATE_SYNC, USER_LOGOUT } from '../../constants';
import { IUserInfo, UserInfo } from '../../types/index'
import {store} from '../../lib/store';

export function user( state:UserInfo = {user_id:0}, action:UserAction ):UserInfo{
    console.log("reduce", state, action )
    let a = state;
    let user = store.read('user');
    if( user ){
        state = Object.assign({}, user);
    }
    switch( action.type ){
        case USER_LOGOUT:
            state = {user_id:0}
            store.write('user', state);
            break;
        case USERINFO_UPDATE:
            state = Object.assign({}, action.payload || {});
            //state = {...a};
            store.write('user', state);
            console.log("store", store.read('user'))
            break;
        case USERINFO_UPDATE_SYNC:
            state = state || {};
            state = Object.assign({}, state);
            if( !state ) state = {};
            state.user_id = 100;
            break;
        case 'INCREMENT':
            state = state || {};
            state = Object.assign({}, state);
            if( !state ) state = {};
            state.user_id = 100;
            break;
    }
    //console.log("reduce after", state)
    return state;
}
