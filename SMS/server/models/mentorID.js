const mongoose = require("mongoose");

const MentorsId = new mongoose.Schema({
    preMentorID: {
        type: String
    },
    MentorId: {
        type: String
    }
})


const MentorId_Schima = mongoose.model("mentorids", MentorsId);
module.exports = MentorId_Schima;