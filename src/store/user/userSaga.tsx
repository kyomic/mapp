import {delay, put, takeEvery, take } from 'redux-saga/effects';

import { USERINFO_UPDATE, USERINFO_UPDATE_SYNC, USER_LOGIN } from '../../constants/index';
import { UserInfo } from '../../types';

export function* update( info:any ){
    yield delay( 2000 )
    console.log('after delay----, args', info  )
    yield put( { type:USERINFO_UPDATE, payload:info } )
}

export function* login( arg:object ){
    console.log('userLogin', arg );
    yield delay( 2000 )

    let info:UserInfo = {
        user_id:10010,
        token:"token",
        name:"wangxk",
        base:{
            user_icon:{

            }
        },
        vip:{}
    }
    console.log('update user', info)
    yield put( { type:USERINFO_UPDATE, payload:info } )
}

export default function* userSaga(){
    console.log("watchIncrementAsync")
    yield takeEvery( USERINFO_UPDATE_SYNC , update);
    yield takeEvery( USER_LOGIN, login );
}