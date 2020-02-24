import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'

export default function TextInputOverlay(props) {
	const [textInput, setTextInput] = useState('');
	return (
		<View
			style={{
				...StyleSheet.absoluteFillObject,
				justifyContent: 'space-around',
				backgroundColor: 'rgba(0,0,0,0.5)',
			}}
		>
			<View
				style={{
					backgroundColor: 'rgb(255,255,255)',
					padding: 4,
				}}
			>
				<Text>
					{props.prompt}
				</Text>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: 'black',
						margin: 4,
					}}
					autoCapitalize='characters'
					keyboardType='visible-password'
					value={textInput}
					onChangeText={text => setTextInput(text)}
				/>
				<Button title='ok'
					onPress={() => { props.setInfo(textInput) }}
				/>
			</View>
		</View>
	)
}
