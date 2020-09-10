import {
    reqRegister,
    reqLogin,
    reqUpdate,
    reqUser,
    reqUserList
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    UPDATE_USER,
    GET_USER,
    USER_LIST
} from './action-types'
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