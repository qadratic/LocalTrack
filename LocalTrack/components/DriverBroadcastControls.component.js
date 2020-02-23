import React from 'react'
import { View, Button } from 'react-native'

export default function DriverBroadcastControls(props) {
	return (
		<View style={{
			flex: 1,
			justifyContent: 'space-around'
		}} >
			<Button title='start journey' />
			<Button title='end journey' />
		</View>
	)
}
