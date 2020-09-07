var express = require('express');
var router = express.Router();
const {
    UserModel
} = require('../db/models')
const md5 = require('blueimp-md5')
const filter = {
    password: 0
} // 查询时过滤出指定的属性
// 注册接口
router.post('/register', (req, res) => {
    const {
        username,
        password,
        type
    } = req.body
    UserModel.findOne({
        username
    }, function (error, user) { // 先查询该用户是否已注册
        console.log('user', user)
        if (user) { //已注册,提示失败信息
            res.send({
                code: 1,
                msg: '此用户已存在'
            })
        } else {
            new UserModel({
                username,
                type,
                password: md5(password)
            }).save(function (error, user) {
                res.cookie('userId', user._id, {
                    maxAge: 1000 * 60 * 60 * 24
                })
                if (!error) {
                    res.send({
                        code: 0,
                        data: {
                            _id: user._id,
                            username,
                            type
                        }
                    })
                }
            })
        }
    })
})

// 登录接口
router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    UserModel.findOne({
        username,
        password: md5(password)
    }, filter, (error, user) => {
        if (user) { //登录成功
            res.cookie('userId', user._id, {
                maxAge: 1000 * 60 * 60 * 24
            })
            res.send({
                code: 0,
                data: user
            })
        } else { // 登录失败
            res.send({
                code: 1,
                msg: '用户名或密码错误'
            })
        }
    })
})

// 更新用户信息
router.post('/update', (req, res) => {
    const userid = req.cookies.userId
    const {
        header,
        info,
        post,
        salary,
        company
    } = req.body
    if (!userid) {
        res.send({
            code: 1,
            msg: '请先登录'
        })
    } else {
        UserModel.findByIdAndUpdate({
            _id: userid
        }, {
            header,
            info,
            post,
            salary,
            company
        }, (error, oldUser) => {
            if (!oldUser) {
                res.clearCookie('userId')
                res.send({
                    code: 1,
                    msg: '请先登录'
                })
            } else {
                const data = Object.assign(oldUser, {
                    header,
                    info,
                    post,
                    salary,
                    company
                })
                res.send({
                    code: 0,
                    data
                })
            }
        })
    }
})
module.exports = router;