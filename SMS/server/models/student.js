const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Student = new mongoose.Schema({
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
    whatsapp: {
        type: Number
    },
    studentID: {
        type: Number
    },
    learningPurpus: {
        type: String
    },
    session: {
        type: String
    },
    studentAddress: {
        type: String
    },
    dueFees: {
        type: Number
    },
    paymentHistory: [{
        screenshort: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    isApprove: {
        type: Boolean
    },
})


Student.pre('save', async function(next){
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

Student.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Student_Schima = mongoose.model("students", Student);
module.exports = Student_Schima;