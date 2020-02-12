import React from 'react'
import { View, Button } from 'react-native'

export default function CurrentLocation(props) {
	return <View>
		<Button
			title='get location updates'
			onPress={() => {
				props.startObservingLocationUpdates()
			}} />
		<Button
			title='stop location updates'
			onPress={() => {
				props.stopObservingLocationUpdates()
			}} />
	</View>
}
