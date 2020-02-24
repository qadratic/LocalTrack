import React from 'react'
import { View, Button } from 'react-native'

export default function DriverBroadcastControls(props) {
	return (
		<View style={{
			flex: 1,
			justifyContent: 'space-around'
		}} >
			{
				props.isOnJourney ?
					<Button title='end journey' onPress={() => { props.endJourney() }} />
					:
					<Button title='start journey' onPress={() => { props.startJourney() }} />
			}
		</View>
	)
}
