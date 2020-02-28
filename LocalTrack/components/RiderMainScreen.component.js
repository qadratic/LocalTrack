import React, { useState } from 'react'
import { View, Text } from 'react-native'
import RiderMapView from './RiderMapView.component'
import TextInputOverlay from './TextInputOverlay.component';

export default function RiderMainScreen() {
	const [locationInfo, setLocationInfo] = useState({
		coords: {
			latitude: 0,
			longitude: 0,
		},
		loaded: false,
	});
	const [vehicleNumber, setVeicleNumber] = useState({
		number: '',
		showDialogue: true,
	});
	return (
		<View style={{ height: '100%' }} >
			<View style={{ height: '20%' }} >
				{/* status */}
				<Text>Status: {locationInfo.loaded ? 'LOADED' : 'LOADING'}</Text>
			</View>
			<View style={{ height: '80%' }} >
				{/* map view */}
				{
					locationInfo.loaded &&
					< RiderMapView {...locationInfo.coords} />
				}
			</View>
			{
				vehicleNumber.showDialogue &&
				<TextInputOverlay
					prompt='Enter number:'
					setInfo={(number) => {
						// check number
						setVeicleNumber({ number, showDialogue: false });
						// register rider here
					}}
				/>
			}
		</View>
	)
}
