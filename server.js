var io = require('socket.io')

var locationServer = io.listen(8080, () => {
	console.log('socket server up!')
});

locationServer.on('connection', (socket) => {
	console.log(socket.id + ' connected');

	socket.on('disconnect', () => {
		console.log(socket.id + ' disconnected')
	})

	socket.on('location_update', () => {
		console.log('location update')
	})
})