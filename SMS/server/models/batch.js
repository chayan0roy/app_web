const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Batch = new mongoose.Schema({
    batchName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    session: {
        type: String
    },
    courseName: {
        type: String
    },
    isAdmissionOpen: {
        type: Boolean,
    },
    classStartDate: {
        type: Date,
    },
    admissionFees: {
        type: Number,
    },
    monthlyFees: {
        type: Number,
    },
    studentDataList: [{
        studentID: {
            type: String,
        }
    }],
    studentIdCounter: {
        type: Number
    },
    teacherDataList: [{
        teacherID: {
            type: String,
        }
    }],
    classTime: [{
        time: {
            type: Date,
        },
        day: {
            type: String,
        }
    }],
    homeWorkList: [{
        date: {
            type: Date,
        },
        work: {
            type: String,
        }
    }],
    studyMAterialList: [{
        date: {
            type: Date,
        },
        material: {
            type: String,
        }
    }],
    noticeList: [{
        date: {
            type: Date,
        },
        notice: {
            type: String,
        }
    }],
    comments: [{
        userID: {
            type: String,
        },
        comment: {
            type: String,
        }
    }],
})



Batch.pre('save', async function(next){
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


Batch.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}


const Batch_Schima = mongoose.model("batches", Batch);
module.exports = Batch_Schima;
