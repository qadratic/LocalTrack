import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

let watchIdArr = []
export default function CurrentLocation() {

	useEffect(() => {
		console.log('hi')
		// Geolocation.requestAuthorization()
	}, [])

	const [currentLocation, setCurrentLocation] = useState('')

	const startObservingLocationUpdates = () => {
		const id = Geolocation.watchPosition((position) => {
			console.log(position)
			setCurrentLocation(JSON.stringify(position))
		}, (err) => {
			console.log(err)
		}, {
			enableHighAccuracy: true,
			distanceFilter: 0,
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

	return <View>
		<Text>Location: {currentLocation} </Text>
		<Button
			title='get location updates'
			onPress={() => {
				startObservingLocationUpdates()
			}} />
		<Button
			title='stop location updates'
			onPress={() => {
				stopObservingLocationUpdates()
			}} />
	</View>
}
