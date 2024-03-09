import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import RadioButton from '../../components/buttons/RadioButton';
// import FileInput from '../../components/imput/InputImage';

const Register = () => {


    const [selectedRole, setSelectedRole] = useState('student');

    const [getCatagory, setGetCatagory] = useState("student");
    // const [viewImage, setViewImage] = useState(defaultAccountImg);

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mobile, setMobile] = useState();
    // Mentor
    const [subject, setSubject] = useState();
    const [preMentorID, setPreMentorID] = useState();
    // Student
    const [whatsapp, setWhatsapp] = useState();
    const [studentAddress, setStudentAddress] = useState();
    const [learningPurpus, setLearningPurpus] = useState();


    return (
        <View>
            
            <Text>Login</Text>
            <View>
                <RadioButton label="Student" onPress={() => setSelectedRole('student')} selected={selectedRole === 'student'} />
                <RadioButton label="Mentor" onPress={() => setSelectedRole('mentor')} selected={selectedRole === 'mentor'} />
                <RadioButton label="Admin" onPress={() => setSelectedRole('admin')} selected={selectedRole === 'admin'} />
            </View>
            <View>
                <TextInput placeholder="Enter Your Name" value={name} onChangeText={setName} />
                <TextInput placeholder="Enter Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput placeholder="Enter Your Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
                <TextInput placeholder="Enter Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="numeric" />

                <TextInput placeholder="Enter Your Subject" value={subject} onChangeText={setSubject} />
                <TextInput placeholder="Enter Your Mentor ID" value={preMentorID} onChangeText={setPreMentorID} />

                <TextInput placeholder="Enter Mobile Number" value={whatsapp} onChangeText={setWhatsapp} keyboardType="numeric" />
                <TextInput placeholder="Enter Your Address" value={studentAddress} onChangeText={setStudentAddress} />
                <TextInput placeholder="Enter Your Learning Purpus" value={learningPurpus} onChangeText={setLearningPurpus} />
            </View>
            {/* <View>
                <FileInput></FileInput>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    // radioButton: {
    // 	flexDirection: 'row',
    // 	alignItems: 'center',
    // 	marginVertical: 5,
    // },
});


export default Register
