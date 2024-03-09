const express = require('express');
const router = express.Router();

const { jwtAuthMiddleware, generateToken } = require('../middleware/jwt');
const uploads = require('../middleware/multer');

const Student_Schima = require('../models/student');
const Batch_Schima = require('../models/batch');


// Signup
router.post('/signup', uploads.single('image'), async (req, res) => {
    let profileIMG;
    if (!req.file) {
        profileIMG = "accont.png";
    } else {
        profileIMG = req.file.filename;
    }

    try {
        const { name, email, password, mobile, whatsapp, studentAddress, learningPurpus } = req.body;

        const existingStudent = await Student_Schima.findOne({ email: email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Student already exists' });
        }

        const batchExist = await Batch_Schima.findOne({ batchName: batchName });
        if (!batchExist) {
            return res.status(400).json({ error: 'Batch not exists' });
        }

        const studentID = batchExist.studentIdCounter + 1;
        batchExist.studentIdCounter = studentID;
        const session = batchExist.session;
        const dueFees = batchExist.monthlyFees + batchExist.admissionFees;
        const student = new Student_Schima({profileIMG, name, email, password, mobile, whatsapp, studentID, learningPurpus, session, studentAddress, dueFees});
        const response = await student.save();
        batchExist.studentDataList = batchExist.studentDataList.concat({ studentID: student._id.toString() });
        await batchExist.save();

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
        const isStudent = await Student_Schima.findOne({ email: email });
        if (!isStudent || !(await isStudent.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }
        const payload = {
            id: isStudent._id,
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
        const isStudent = await Student_Schima.findById(token);
        res.status(200).json({ isStudent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Update Picture
router.put('/profile/picture', uploads.single('image'), async (req, res) => {
    const token = jwtAuthMiddleware(req.body.token);
    try {
        const isStudent = await Student_Schima.findById(token);
        if(isStudent) {
            isStudent.profileIMG = req.file.filename;
            await isStudent.save();
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

        const isStudent = await Student_Schima.findById(token);

        if (!isStudent || !(await isStudent.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        isStudent.password = newPassword;
        await isStudent.save();
        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

























// app.post("/uploadFiles", upload.single("file"), async (req, res) => {
// 	const { token, amount } = req.body;
// 	const fileName = req.file.filename;
// 	try {
// 		const isStudentExist = await Student_Schima.findOne({ "tokens.token": token });
// 		if (isStudentExist) {
// 			isStudentExist.paymentHistory = isStudentExist.paymentHistory.concat({ screenshort: fileName, amount: amount });
// 			isStudentExist.isApprove = true;
// 			await isStudentExist.save();
// 			res.send({ status: true });
// 		}
// 	} catch (error) {
// 		res.json({ status: error });
// 	}
// });





// app.post("/approve", upload.single("file"), async (req, res) => {
// 	const { ID, amount } = req.body;
// 	try {
// 		const isStudentExst = await Student_Schima.findOne({ _id: ID });
// 		if (isStudentExst) {
// 			isStudentExst.dueFees = isStudentExst.dueFees - amount;
// 			isStudentExst.isApprove = false;
// 			await isStudentExst.save();
// 			res.json({ status: true });
// 		} else {
// 			res.json({ status: false });
// 		}
// 	}
// 	catch (err) {
// 		res.json({ status: err });
// 	}
// });



// app.post("/getPaymentHistorysAdmin", upload.single("file"), async (req, res) => {
// 	const { ID } = req.body;
// 	try {
// 		const isStudentExst = await Student_Schima.findOne({ _id: ID });
// 		res.send(isStudentExst.paymentHistory);
// 	}
// 	catch (err) {
// 		res.json({ status: err });
// 	}
// });








module.exports = router;