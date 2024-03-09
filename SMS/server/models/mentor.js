const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Mentor = new mongoose.Schema({
    profileIMG: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    subject: {
        type: String
    },
    role: {
        type: String,
        enum: ['mentor', 'admin'],
        default: 'mentor'
    },
    preMentorID: {
        type: String
    },
    batchId: {
        type: String,
    }
})


Mentor.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

Mentor.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Mentor_Schima = mongoose.model("mentors", Mentor);
module.exports = Mentor_Schima;
