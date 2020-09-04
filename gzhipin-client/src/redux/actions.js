import {
    reqRegister,
    reqLogin
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'
// 包含n个action creator 
// 异步action
export function register(user) {
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}

export function login(user) {
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
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