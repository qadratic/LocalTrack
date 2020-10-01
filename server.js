// TODO: join rooms!

const io = require('socket.io')();

let driversMap = new Map();

function initializeDriver(client, driver) {
	driversMap.set(driver.number, 'on_trip')
	// client.join(driver.number);
	console.log(driver)
	// second listener on disconnect
	client.on('disconnect', () => {
		// io.to(driver.number).broadcast('driver_offline');
	});

	client.on('location_update', location => {
		console.log('location update', location)
		// io.to(driver.number).broadcast('location update!');
	});
	client.on('end_journey', () => {
		// journey ended.
		driversMap.set(driver.number, 'finished_ride')
		// broadcast journey ended
		console.log('end journey', driver)
		// client.disconnect()
	});
}

function initializeAdministrator(client, driver) {
	driversMap.set(driver.number, 'on_trip')
	// client.join(driver.number);
	console.log(driver)
	// second listener on disconnect
	client.on('disconnect', () => {
		// io.to(driver.number).broadcast('driver_offline');
	});

	client.on('location_update', location => {
		console.log('location update', location)
		// io.to(driver.number).broadcast('location update!');
	});
	client.on('end_journey', () => {
		// journey ended.
		driversMap.set(driver.number, 'finished_ride')
		// broadcast journey ended
		console.log('end journey', driver)
		// client.disconnect()
	});
}

function initializeRider(client, rider) {
	// client.join(rider.number);
	if (driversMap.has(rider.number)) {
		//ride has started
		if (driversMap.get(rider.number) === 'finished_ride') {
			client.emit('ride_finished');
		}
	} else {
		//ride not started
		client.emit('ride_not_started');
	}
}

function attatchListeners(client) {
	client.on('disconnect', () => {
		console.log(client.id, 'disconnected')
		client.removeAllListeners();
	})
	client.on('register_driver', driver => {
		initializeDriver(client, driver);
	});

	client.on('register_rider', rider => {
		initializeRider(client, rider);
	});

}

io.on('connection', client => {
	attatchListeners(client);
	console.log(client.id, 'connected')
});



io.listen(process.env.PORT | 8080);
