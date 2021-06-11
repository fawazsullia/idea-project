const mongoose = require('mongoose');


const userAuthSchema = new mongoose.Schema({
    userName : String,
    hash: String,
    userType : String


});

const Users = mongoose.model('Users', userAuthSchema);

module.exports = Users;