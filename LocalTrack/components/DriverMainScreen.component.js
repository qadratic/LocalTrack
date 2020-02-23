import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import DriverMapView from './DriverMapView.component'
const socket = require('socket.io-client')('http://192.168.1.34:3000')

export default function DriverMainScreen() {
	const [locationInfo, setLocationInfo] = useState({
		coords: {
			latitude: 0,
			longitude: 0,
		},
		loaded: false,
	});
	useEffect(() => {
		// connect to socket
		socket.on('connect', () => {
			console.log('connected')
			// setStatus('connected!')
		});
		socket.on('connect_error', (error) => {
			console.log(error)
			// setStatus('error connecting')
		});

		// watch location
		Geolocation.watchPosition(position => {
			const { latitude, longitude } = position.coords;
			// socket.emit('location_update', position.coords);
			setLocationInfo({ coords: { latitude, longitude }, loaded: true });
		}, {
			enableHighAccuracy: true,
			distanceFilter: 10,
			interval: 1000
		})

		return () => {
			Geolocation.clearWatch(0);
			Geolocation.stopObserving();
			socket.disconnect();
		}
	}, []);
	return (
		<View
			style={{ height: '100%' }}
		>
			{/* <Text>
				{JSON.stringify(locationInfo)}
			</Text> */}
			<View
				style={{ height: '80%' }}
			>
				{locationInfo.loaded && < DriverMapView locationInfo={locationInfo} />}
			</View>
			{/* buttons */}
		</View>
	)
}
