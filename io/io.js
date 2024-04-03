const io = require('socket.io')()
const { userQuery } = require('../prisma/query/query')

io.on('connection', (socket) => {

    socket.on('newActif', async (userId) => {
        socket.userId = userId
        await userQuery.setStatus(socket.userId, true).then(() => {
            console.log('connected ' + userId)
        }).catch((err) => {
            console.log('user not found')
        })
        socket.broadcast.emit('signial', '1')
    })

    socket.on('deconnectUser', async (mes) => {
        await userQuery.setStatus(socket.userId, false).then(() => {
            console.log('disconnected ' + socket.userId)
        }).catch((err) => {
            console.log('user not found')
        })
        socket.broadcast.emit('signial', '1')
    })

    socket.on('disconnect', async () => {
        await userQuery.setStatus(socket.userId, false).then(() => {
            console.log('disconnected ' + socket.userId)
        }).catch((err) => {
            console.log('user not found')
        })
        socket.broadcast.emit('signial', '1')
    })

})

module.exports = io