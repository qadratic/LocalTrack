import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import DriverMapView from './DriverMapView.component'
import DriverBroadcastControls from './DriverBroadcastControls.component'
const socket = require('socket.io-client')('http://192.168.1.34:3000')

export default function DriverMainScreen() {
	const [locationInfo, setLocationInfo] = useState({
		coords: {
			latitude: 0,
			longitude: 0,
		},
		loaded: false,
	});
	const [isOnJourney, setIsOnJourney] = useState(false);
	useEffect(() => {
		// connect to socket
		socket.on('connect', () => {
			console.log('connected')
			// setStatus('connected!')
		});
		socket.on('connect_error', (error) => {
			// console.log(error)
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
	const startJourney = () => {
		// socket.emit('register_driver');
		setIsOnJourney(true);
	}
	const endJourney = () => {
		// socket.emit('register_driver');
		setIsOnJourney(false);
	}
	return (
		<View
			style={{ height: '100%' }}
		>
			<View
				style={{ height: '80%' }}
			>
				{/* map view */}
				{locationInfo.loaded &&
					< DriverMapView {...locationInfo.coords} />
				}
			</View>
			<View style={{
				height: '20%'
			}} >
				{/* buttons */}
				{locationInfo.loaded &&
					<DriverBroadcastControls
						isOnJourney={isOnJourney}
						startJourney={startJourney}
						endJourney={endJourney}
					/>
				}
			</View>
		</View>
	)
}
