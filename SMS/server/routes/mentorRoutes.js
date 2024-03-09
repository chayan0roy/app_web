const express = require('express');
const router = express.Router();


const { jwtAuthMiddleware, generateToken } = require('../middleware/jwt');
const uploads = require('../middleware/multer');

const Student_Schima = require('../models/student');
const Mentor_Schima = require('../models/mentor');
const Batch_Schima = require('../models/batch');
const MentorId_Schima = require('../models/mentorID');



// Signup
router.post('/signup', uploads.single('image'), async (req, res) => {
    let profileIMG;
    if (!req.file) {
        profileIMG = "accont.png";
    } else {
        profileIMG = req.file.filename;
    }

    try {
        const { name, email, password, mobile, subject, role, preMentorID } = req.body;
   
        const adminUser = await Mentor_Schima.findOne({ role: 'admin' });
        if (role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const existingMentor = await Mentor_Schima.findOne({ email: email });
        if (existingMentor) {
            return res.status(400).json({ error: 'Mentor already exists' });
        }

        const preMentorIDExist = await MentorId_Schima.findOne({ preMentorID: preMentorID });
        if (!preMentorIDExist || preMentorIDExist.MentorId) {
            return res.status(400).json({ error: 'Mentor Id is invalid credential' });
        }

        const mentor = new Mentor_Schima({ name, email, password, mobile, subject, role, preMentorID });
        const response = await mentor.save();
        preMentorIDExist.MentorId = response._id.toString();
        await preMentorIDExist.save();

        const payload = {
            id: response._id
        }
        const token = generateToken(payload);

        res.status(200).json({ response: response, token: token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isMentor = await Mentor_Schima.findOne({ email: email });
        if (!isMentor || !(await isMentor.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }
        const payload = {
            id: isMentor._id,
        }
        const token = generateToken(payload);
        res.json({ token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get Profile
router.get('/profile', async (req, res) => {
    const token = jwtAuthMiddleware(req.body.token);
    try {
        const isMentor = await Mentor_Schima.findById(token);
        res.status(200).json({ isMentor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Update Picture
router.put('/profile/picture', uploads.single('image'), async (req, res) => {
    const token = jwtAuthMiddleware(req.body.token);
    try {
        const isMentor = await Mentor_Schima.findById(token);
        if(isMentor) {
            isMentor.profileIMG = req.file.filename;
            await isMentor.save();
            console.log('Image updated');
            res.status(200).json({ message: 'Image updated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




// Update Password
router.put('/profile/password', async (req, res) => {
    const token = jwtAuthMiddleware(req.body.token);
    try {
        const { currentPassword, newPassword } = req.body;

        const isMentor = await Mentor_Schima.findById(token);

        if (!isMentor || !(await isMentor.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        isMentor.password = newPassword;
        await isMentor.save();
        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;

































// app.post("/makeBatch", upload.single("file"), async (req, res) => {
// 	const { token, batchName, batchPassword, session, courseName, admissionFees, monthlyFees, studentIdCounter, classTime } = req.body;

// 	try {
// 		const isBatchName = await Batch_Schima.findOne({ batchName: batchName });
// 		if (isBatchName) {
// 			res.send({ status: false });
// 		} else {
// 			const isTeacherToken = await Teacher_Schima.findOne({ "tokens.token": token });
// 			isTeacherToken.batchName = isTeacherToken.batchName.concat({ id: batchName });
// 			await isTeacherToken.save();
// 			const batch = new Batch_Schima({ batchName, batchPassword, session, courseName, admissionFees, monthlyFees, studentIdCounter, classTime });
// 			await batch.save();
// 			batch.teacherDataList = batch.teacherDataList.concat({ teacherID: isTeacherToken._id.toString() });
// 			await batch.save();
// 			res.send({ status: true });
// 		}
// 	}
// 	catch (err) {
// 		res.json({ status: err });
// 	}
// });



// app.post("/getStudentFeesPaymentDetails", upload.single("file"), async (req, res) => {
// 	const { token } = req.body;
// 	try {
// 		const isStudentToken = await Student_Schima.findOne({ "tokens.token": token });
// 		const isbatchName = await Batch_Schima.findOne({ batchName: isStudentToken.batchName });
// 		res.send(
// 			{
// 				monthlyFees: isbatchName.monthlyFees,
// 				admissionFees: isbatchName.admissionFees,
// 				dueFees: isStudentToken.dueFees,
// 				paymentHistory: isStudentToken.paymentHistory
// 			}
// 		);
// 	}
// 	catch (err) {
// 		res.json({ status: err });
// 	}
// });



// app.post("/getStudentDetailsAdmin", upload.single("file"), async (req, res) => {
// 	const { token, batchID } = req.body;
// 	const arr = [];
// 	try {
// 		const isTeacher = await Teacher_Schima.findOne({ "tokens.token": token });
// 		if (isTeacher) {
// 			const isBatch = await Batch_Schima.findOne({ "batchName": batchID });
// 			for (let r of isBatch.studentDataList) {
// 				const students = await Student_Schima.findOne({ _id: r.studentID });
// 				arr.push(
// 					{
// 						id: students._id,
// 						studentName: students.studentName,
// 						dueFees: students.dueFees
// 					}
// 				)
// 			}
// 		}
// 		res.send(arr);
// 	}
// 	catch (err) {
// 		res.json({ status: err });
// 	}
// });









