const express = require('express');
const router = express.Router();

const { jwtAuthMiddleware } = require('../middleware/jwt');

const Student_Schima = require('../models/student');
const Mentor_Schima = require('../models/mentor');
const Batch_Schima = require('../models/batch');
const MentorId_Schima = require('../models/mentorID');


// Check Who
router.get('/checkWho', async (req, res) => {
    console.log(req.body);
    // const token = jwtAuthMiddleware(req.body.token);
    // try {
    //     const isMentor = await Mentor_Schima.findById(token);
    //     if (isMentor) {
    //         return res.status(200).json({ isMentor });
    //     }
    //     const isStudent = await Student_Schima.findById(token);
    //     if (isStudent) {
    //         return res.status(200).json({ isStudent });
    //     }
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
})

module.exports = router;