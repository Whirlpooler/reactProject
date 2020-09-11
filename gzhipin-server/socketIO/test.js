module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', function (socket) {
        console.log('socketio connected')
        socket.on('sendMsg', function (data) {
            console.log('服务器端接收到浏览器的信息', data)
            io.emit('receiveMsg', data.name + '_' + data.data)
            console.log('服务器向浏览器发送消息', data)
        })
    })
}