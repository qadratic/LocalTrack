import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, StyleSheet, Text } from 'react-native'

export default function DriverMapView(props) {
	const styles = StyleSheet.create({
		container: {
			// ...StyleSheet.absoluteFillObject,
			height: 390,
			width: 310,
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		map: {
			...StyleSheet.absoluteFillObject,
		},
	});
	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				style={styles.map}
				region={{
					latitude: props.currentLocation.latitude,
					longitude: props.currentLocation.longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
			>
				<Marker
					coordinate={{ latitude: props.currentLocation.latitude, longitude: props.currentLocation.longitude }}
					title={'You'}
					description={'your current location'}
				/>
			</MapView>
		</View>
	)
}

