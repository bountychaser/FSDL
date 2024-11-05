const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kamblechinmay8:Chinmay%408@cluster0.kgcnr.mongodb.net/Databases').then(()=>{console.log('Databse Conected');});

const users = new mongoose.Schema({
    FirstName:{type: String, required: true},
    LastName: {type: String, required: true},
    Email:{type:String, required: true, unique: true},
    Password:{type:String, required: true}
});

const admin = new mongoose.Schema({
    FirstName:{type: String, required: true},
    LastName: {type: String, required: true},
    Email:{type:String, required: true, unique: true},
    Password:{type:String, required: true}
});

const courses = new mongoose.Schema({
    Title : {type: String, required:true},
    Description: {type: String, required: true},
    Price: {type: Number, required: true}, 
    adminID:{type: mongoose.Schema.Types.ObjectId, ref : 'Admin'}
});

const purchases = new mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required:true, ref : 'User'},
    courseID: {type:mongoose.Schema.Types.ObjectId, ref : 'Course'}
});

const coursesmd = mongoose.model('Course', courses);
const purchasesmd = mongoose.model('Purchase', purchases);
const usermd = mongoose.model('User', users);
const adminmd = mongoose.model('Admin', admin);

module.exports = {
usermd, adminmd,coursesmd, purchasesmd
};
