/*
包含n个reducers函数：根据老的state和指定的action 返回一个新的state
*/

import {
    combineReducers
} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    UPDATE_USER,
    RESET_USER
} from './action-types'
const initUser = {
    username: '', // 用户名
    type: '', // 类型
    msg: '', // 错误提示信息
    redirectTo: '' //需要自动重定向的路由路径
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...action.data, redirectTo: getRedirectTo(action.type, action.header)
            }
            case ERROR_MSG:
                return {
                    ...state, msg: action.data
                }
            case UPDATE_USER:
                return action.data
            case RESET_USER:
                return {
                    ...initUser,msg:action.data
                }    
                default:
                    return state
    }
}

export default combineReducers({
    user
})

// 向外暴露的状态结构： {xxx:0,yyy:0}
function getRedirectTo(type, header) {
    let path
    if (type === 'laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    if (!header) {
        path += 'info'
    }
    return path
}