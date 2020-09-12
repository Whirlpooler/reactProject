const { ChatModel } = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', function (socket) {
        console.log('socketio connected')
        socket.on('sendMsg', function ({ from, to, content }) {
            const chat_id = [from, to].sort().join('-')
            const create_time = new Date().getTime()
            console.log('服务器端接收到浏览器的信息', { from, to, chat_id, create_time, content })
            new ChatModel({ from, to, chat_id, create_time, content }).save(function (error, chatMsg) {
                io.emit('receiveMsg', { from, to, chat_id, create_time, content })
                console.log('服务器向浏览器发送消息', { from, to, chat_id, create_time, content })
            })
        })
    })
}