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
    const { username, password, password2, type } = user

    if (!username) {
        return errorMsg('用户名不能为空！')
    } else if (password !== password2) {
        return errorMsg('2次密码要一致！')
    }

    return async dispatch => {
        const { data } = await reqRegister({ username, password, type })
        if (data.code === 0) { // 成功
            dispatch(authSuccess(data.data))
        } else { //失败
            dispatch(errorMsg(data.msg))
        }
    }
}

export function login(user) {
    const { username, password } = user

    if (!username) {
        return errorMsg('用户名不能为空！')
    } else if (!password) {
        return errorMsg('密码不能为空！')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
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