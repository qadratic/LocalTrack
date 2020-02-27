import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native'

export default function RiderMapView(props) {
	return (
		<View style={{ height: '100%' }} >
			<MapView
				provider={PROVIDER_GOOGLE}
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
					title={'Live Location'}
				/>
			</MapView>
		</View>
	)
}

