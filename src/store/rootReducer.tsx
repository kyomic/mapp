import { combineReducers } from 'redux'

import {channels} from './channels/channels'
import {user} from './user/user'
// 合并 reducer
const rootReducer = combineReducers({
    channels,
    user,
  });
export default rootReducer