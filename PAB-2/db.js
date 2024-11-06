const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kamblechinmay8:Chinmay%408@cluster0.kgcnr.mongodb.net/').then(()=>{console.log('Databse Connected')});

const users = new mongoose.Schema(
    {
        FirstName:{type: String, required: true},
        LastName:{type: String, required: true},
        Email:{type:String, required: true, unique: true},
        Password:{type:String, required: true}
    }
);

const items = new mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required: true, ref : 'User'},
    itemName:{type: String, required: true}
})


const usermd = new mongoose.model('User', users);
const itemsmd = new mongoose.model('Item', items);

module.exports = {
    usermd: usermd,
    itemsmd: itemsmd
}