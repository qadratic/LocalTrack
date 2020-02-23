import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import DriverMapView from './DriverMapView.component'
import CurrentLocation from './CurrentLocation.component'
import Geolocation from 'react-native-geolocation-service'

let loctionWatcher = {
	watching: false,
	id: 0,
}
export default function DriverMainScreen() {

	const [currentLocation, setCurrentLocation] = useState({ latitude: 1, longitude: 1, loaded: false });

	useEffect(() => {
		Geolocation.getCurrentPosition(({ coords }) => {
			console.log(coords)
			setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude, loaded: true });
		}, (err) => {
			console.log(err)
		}, {
			enableHighAccuracy: false,
			timeout: 15000,
			maximumAge: 10000
		});
	}, []);

	const startObservingLocationUpdates = () => {
		if (loctionWatcher.watching) { console.log('already watching!'); return }
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
		loctionWatcher.watching = true;
		loctionWatcher.id = id;
		// watchIdArr.push(id)
		// console.log(watchIdArr)

	}

	const stopObservingLocationUpdates = () => {
		if (!loctionWatcher.watching) { return }
		// console.log(watchIdArr)
		Geolocation.clearWatch(loctionWatcher.id)
		loctionWatcher.watching = false;
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
