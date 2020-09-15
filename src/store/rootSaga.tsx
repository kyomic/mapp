import { all } from 'redux-saga/effects'
// 引入 各个模块 mysagas
import channelsSaga from './channels/channelsSaga'
import userSaga from './user/userSaga'

// 合并 mysagas
const rootSagas = function* () {
    yield all([
        channelsSaga(),
        userSaga()
    ])
}

export default rootSagas