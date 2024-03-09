import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import RadioButton from '../../components/buttons/RadioButton';
// import InputBox from '../../components/inputbox/InputBox';


const Login = () => {
	const [selectedRole, setSelectedRole] = useState('student');

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	return (
		<View>
			<View>
				<Text>Image Area</Text>
			</View>
			<Text>Login</Text>
			<View>
				<RadioButton label="Student" onPress={() => setSelectedRole('student')} selected={selectedRole === 'student'} />
				<RadioButton label="Mentor" onPress={() => setSelectedRole('mentor')} selected={selectedRole === 'mentor'} />
				<RadioButton label="Admin" onPress={() => setSelectedRole('admin')} selected={selectedRole === 'admin'} />
			</View>
			<View>
				<TextInput placeholder="Enter Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
				<TextInput placeholder="Enter Your Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
			</View>
		</View>
	);
};





const styles = StyleSheet.create({
	// radioButton: {
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// 	marginVertical: 5,
	// },
});

export default Login;
