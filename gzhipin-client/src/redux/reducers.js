/*
包含n个reducers函数：根据老的state和指定的action 返回一个新的state
*/

import {
    combineReducers
} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'
const initUser = {
    username: '', // 用户名
    type: '', // 类型
    msg: '', // 错误提示信息
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, ...action.data
            }
            case ERROR_MSG:
                return {
                    ...state, msg: action.data
                }
                default:
                    return state
    }
}

export default combineReducers({
    user
})

// 向外暴露的状态结构： {xxx:0,yyy:0}