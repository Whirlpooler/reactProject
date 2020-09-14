import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserList,
    reqChatList,
    reqSetRead
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    UPDATE_USER,
    GET_USER,
    USER_LIST,
    CAHT_MSG_LIST,
    CAHT_MSG,
    SET_READ
} from './action-types'
import io from 'socket.io-client'
function initOI(dispatch, userId) {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', function (data) {
            if (userId === data.from || userId === data.to) {
                dispatch(chatMsg(data, userId ))
            }
        })
    }
}
export function sendMsg({ from, to, content }) {
    return dispatch => {
        io.socket.emit('sendMsg', { from, to, content })
    }
}

async function getMsgList(dispatch, userId) {
    initOI(dispatch, userId)
    const response = await reqChatList()
    const result = response.data
    if (result.code === 0) {
        dispatch(msgList({ ...result.data, userId }))
    }
}

export function readMsg(from,to){
    return async dispatch => {
        const response = await reqSetRead(from)
        const result = response.data
        if(result.code === 0){
            dispatch(setRead({from,to,count:result.data}))
        }
    }
}
// 包含n个action creator 
// 异步action
export function register(user) {
    const {
        username,
        password,
        password2,
        type
    } = user

    if (!username) {
        return errorMsg('用户名不能为空！')
    } else if (password !== password2) {
        return errorMsg('2次密码要一致！')
    }

    return async dispatch => {
        const {
            data
        } = await reqRegister({
            username,
            password,
            type
        })
        if (data.code === 0) { // 成功
            getMsgList(dispatch, data.data._id)
            dispatch(authSuccess(data.data))
        } else { //失败
            dispatch(errorMsg(data.msg))
        }
    }
}

export function login(user) {
    const {
        username,
        password
    } = user

    if (!username) {
        return errorMsg('用户名不能为空！')
    } else if (!password) {
        return errorMsg('密码不能为空！')
    }
    return async dispatch => {
        const response = await reqLogin({
            username,
            password
        })
        const result = response.data
        if (result.code === 0) { // 成功
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

export function updateUserAsync(user) {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if (result.code === 0) { // 更新成功
            dispatch(updateUser(result.data))
        } else { // 更新失败
            dispatch(resetUser(result.msg))
        }
    }
}
export function getUser() {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) { // 获取成功
            getMsgList(dispatch, result.data._id)
            dispatch(User(result.data))
        } else { // 获取失败
            dispatch(errorMsg(result.msg))
        }
    }
}
export function getUserList(type) {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(userList(result.data))
        } else {
            dispatch(errorMsg('列表获取失败'))
        }
    }
}


const msgList = ({ users, chatMsgs, userId }) => ({
    type: CAHT_MSG_LIST,
    data: { users, chatMsgs, userId }
})
const chatMsg = (chatMsg,userId) => ({
    type: CAHT_MSG,
    data: chatMsg,
    userId
})
const setRead = (msg) => ({
    type: SET_READ,
    data: msg
})
// 同步action
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data: msg
})
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
const updateUser = (user) => ({
    type: UPDATE_USER,
    data: user
})
export const resetUser = (msg) => ({
    type: RESET_USER,
    data: msg
})
const User = (user) => ({
    type: GET_USER,
    data: user
})
const userList = (userList) => ({
    type: USER_LIST,
    data: userList
})