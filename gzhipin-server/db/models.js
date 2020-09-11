/*包含 n 个能操作 mongodb 数据库集合的 model 的模块
1. 连接数据库
1.1. 引入 mongoose
1.2. 连接指定数据库(URL 只有数据库是变化的)
1.3. 获取连接对象
1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义出对应特定集合的 Model 并向外暴露
2.1. 字义 Schema(描述文档结构)
2.2. 定义 Model(与集合对应, 可以操作集合)
2.3. 向外暴露 Model
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gzhipin')
const conn = mongoose.connection
conn.on('connected', function () {
    console.log('数据库连接成功')
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    header: {
        type: String
    }, //头像
    post: {
        type: String
    }, // 职位
    info: {
        type: String
    }, // 个人简介或信息
    company: {
        type: String
    }, // 公司名称
    salary: {
        type: String
    } // 工资
})

const UserModel = mongoose.model('user', userSchema)
exports.UserModel = UserModel

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    }, //发送用户的id
    to: {
        type: String,
        required: true
    }, //接收用户的id
    chat_id: {
        type: String,
        required: true
    }, // from和to组成的字符串
    content: {
        type: String,
        required: true
    }, //内容
    read: {
        type: Boolean,
        default: false
    }, //是否已读
    create_time: {
        type: Number
    }
})
const ChatModel = mongoose.model('chat', chatSchema)
exports.ChatModel = ChatModel