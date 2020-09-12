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
    RESET_USER,
    GET_USER,
    USER_LIST,
    CAHT_MSG_LIST,
    CAHT_MSG
} from './action-types'
import {
    getRedirectTo
} from '../util/index'
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
                ...action.data, redirectTo: getRedirectTo(action.data.type, action.header)
            }
        case ERROR_MSG:
            return {
                ...state, msg: action.data
            }
        case UPDATE_USER:
            return action.data
        case RESET_USER:
            return {
                ...initUser, msg: action.data
            }
        case GET_USER:
            return {
                ...initUser, ...action.data
            }
        default:
            return state
    }
}
const initUserList = []
function userList(state = initUserList, action) {
    switch (action.type) {
        case USER_LIST:
            return action.data
        default:
            return state
    }
}

const initMsg = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
function msgList(state = initMsg, action) {
    switch (action.type) {
        case CAHT_MSG_LIST:
            return {
                ...action.data,
                unReadCount: action.data.chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === action.data.userId ? 1 : 0), 0)
            }
        case CAHT_MSG:
            const { chatMsg, userId } = action.data
            return {
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userId ? 1 : 0),
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg]
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    msgList
})

// 向外暴露的状态结构： {xxx:0,yyy:0}