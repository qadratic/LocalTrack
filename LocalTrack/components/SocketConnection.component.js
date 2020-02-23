import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'

const socket = require('socket.io-client')('http://192.168.1.34:3000');

export default function SocketConnection() {
	const [status, setStatus] = useState('')

	useEffect(() => {
		socket.on('connect', () => {
			console.log('connected')
			setStatus('connected!')
		})
		socket.on('connect_error', (error) => {
			console.log(error)
			setStatus('error connecting')
		});
	}, [])

	let startSendingUpdates = () => {
		const number = 'CHO1AA4345'
		socket.emit('register_driver', {number})
		
	}

	return (
		<View style={{
			// display:'flex',
			// flex: 1,
			height: '100%',
			// flexDirection: 'column',
			justifyContent: 'space-around',
		}} >
			<Button
				title='start sending updates'
				onPress={() => {
					// startSendingUpdates()
				}}
			/>
			<Button
				title='disconnect socket'
			/>
			<Text>
				{status}
			</Text>
		</View>
	)
}
