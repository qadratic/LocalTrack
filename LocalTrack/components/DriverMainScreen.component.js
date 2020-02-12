import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import DriverMapView from './DriverMapView.component'
import CurrentLocation from './CurrentLocation.component'
import Geolocation from 'react-native-geolocation-service'

let watchIdArr = []
export default function DriverMainScreen() {

	const [currentLocation, setCurrentLocation] = useState({ latitude: 1, longitude: 1, loaded: false });

	useEffect(() => {
		Geolocation.getCurrentPosition(({ coords }) => {
			console.log(coords)
			setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude, loaded: true });
		}, (err) => {
			console.log(err)
		}, {
			enableHighAccuracy: true,
			timeout: 15000,
			maximumAge: 10000
		});
	}, []);

	const startObservingLocationUpdates = () => {
		const id = Geolocation.watchPosition(({ coords }) => {
			console.log(coords)
			setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude, loaded: true })
		}, (err) => {
			console.log(err)
		}, {
			enableHighAccuracy: true,
			distanceFilter: 10,
			interval: 1000
		})

		console.log(id)

		watchIdArr.push(id)
		// console.log(watchIdArr)

	}

	const stopObservingLocationUpdates = () => {
		// console.log(watchIdArr)
		watchIdArr.map(id => Geolocation.clearWatch(id))
		watchIdArr = []
		Geolocation.stopObserving()
	}

	return (
		<View>
			{currentLocation.loaded && <DriverMapView
				currentLocation={currentLocation}
			/>}
			<CurrentLocation
				startObservingLocationUpdates={startObservingLocationUpdates}
				stopObservingLocationUpdates={stopObservingLocationUpdates}
			/>
		</View>
	)
}
