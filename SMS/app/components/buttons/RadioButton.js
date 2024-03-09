import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, onPress, selected }) => (
	<TouchableOpacity style={styles.radioButton} onPress={onPress}>
		<View style={styles.radioButtonCircle}>
			{selected && <View style={styles.radioButtonInnerCircle} />}
		</View>
		<Text>{label}</Text>
	</TouchableOpacity>
);


const styles = StyleSheet.create({
	radioButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 5,
	},
	radioButtonCircle: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	},
	radioButtonInnerCircle: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: '#007bff',
	},
});


export default RadioButton;