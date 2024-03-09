import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import defaultAccountImg from "../../assets/accont.png";

export default function Register() {

	const allCatagory = ["আমি শিখে ফ্রিলান্সিং করে ইনকাম চাই", "আমি নিজের বিসনেসের জন্য শিখছি", "আমার ডিজিটাল এজেন্সি খুলতে চাই"];
	const allRoll = ["mentor", "admin"];

	const navigate = useNavigate();

	const [getCatagory, setGetCatagory] = useState("student");
	const [viewImage, setViewImage] = useState(defaultAccountImg);

	const [image, setImage] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [mobile, setMobile] = useState();
	// Mentor
	const [subject, setSubject] = useState();
	const [role, setRole] = useState();
	const [preMentorID, setPreMentorID] = useState();
	// Student
	const [whatsapp, setWhatsapp] = useState();
	const [studentAddress, setStudentAddress] = useState();
	const [learningPurpus, setLearningPurpus] = useState();

	const convertUserIMG = (e) => {
		e.preventDefault();
		setImage(e.target.files[0]);
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setViewImage(fileReader.result);
		}
	}

	const handleRegister = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("image", image);
		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("mobile", mobile);

		if (getCatagory == "student") {
			formData.append("whatsapp", whatsapp);
			formData.append("studentAddress", studentAddress);
			formData.append("learningPurpus", learningPurpus);

			const result = await axios.post("http://localhost:5000/student/signup", formData);
			console.log(result);
			navigate('/');

		} else if ((getCatagory == "teacher")) {
			formData.append("subject", subject);
			formData.append("role", role);
			formData.append("preMentorID", preMentorID);

			const result = await axios.get("http://localhost:5000/mentor/signup", formData);
			console.log(result);
			navigate('/');
		}
	};

	return (
		<form className="Login_Register Register" onSubmit={handleRegister}>
			<div className='input_image_box flex'>
				<img src={viewImage} />
				<input type="file" className="image_input" onChange={convertUserIMG} />
			</div>
			<div className="input_text_box_Area flex">
				<div className="form-check">
					<input type="radio" className="form-check-input" name="role" id="studentRadio" value={"student"} onChange={(e) => setGetCatagory(e.target.value)} defaultChecked />
					<label htmlFor="studentRadio" className="form-check-label">Student</label>
				</div>
				<div className="form-check ms-2">
					<input type="radio" className="form-check-input" name="role" id="teacherRadio" value={"teacher"} onChange={(e) => setGetCatagory(e.target.value)} />
					<label htmlFor="teacherRadio" className="form-check-label">Teacher</label>
				</div>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার পুরো নাম' type='text' required onChange={(e) => setName(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার ইমেল আইডি' type='email' required onChange={(e) => setEmail(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='Enter Your Password' type='password' required onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<div className="input_text_box_Area flex">
				<input className='input_box' placeholder='আপনার ফোন নাম্বার' type='number' required onChange={(e) => setMobile(e.target.value)}></input>
			</div>

			{
				getCatagory == "student"
					?
					<>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='আপনার Whatsapp নাম্বার' type='number' required onChange={(e) => setWhatsapp(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<select className='input_box' onChange={(c) => setLearningPurpus(c.target.value)}>
								{
									allCatagory.map((c) => {
										return (
											<option value={c}>{c}</option>
										)
									})
								}
							</select>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='পিন কোড সমেত পুরো ঠিকানা' type='text' required onChange={(e) => setStudentAddress(e.target.value)}></input>
						</div>
					</>
					:
					<>

						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Teacher ID' type='text' required onChange={(e) => setPreMentorID(e.target.value)}></input>
						</div>
						<div className="input_text_box_Area flex">
							<select className='input_box' onChange={(c) => setRole(c.target.value)}>
								{
									allRoll.map((c) => {
										return (
											<option value={c}>{c}</option>
										)
									})
								}
							</select>
						</div>
						<div className="input_text_box_Area flex">
							<input className='input_box' placeholder='Teacher ID' type='text' required onChange={(e) => setSubject(e.target.value)}></input>
						</div>
					</>
			}
			<div className='submitBtnArea flex'>
				<button className='btn' type='submit'>Submit</button>
				<Link className='link' to="/">Login your Account</Link>
			</div>
		</form>
	)
}
