import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View } from 'react-native'

export default function DriverMapView(props) {
	return (
		<View
			style={{
				height: '100%'
			}}
		>
			<MapView
				provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				style={{
					height: '100%'
				}}
				region={{
					latitude: props.latitude,
					longitude: props.longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
			>
				<Marker
					coordinate={{ latitude: props.latitude, longitude: props.longitude }}
					title={'You'}
					description={'your current location'}
				/>
			</MapView>
		</View>
	)
}

