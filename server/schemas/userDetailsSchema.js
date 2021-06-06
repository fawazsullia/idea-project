const mongoose = require('mongoose');

//schema for user details

const userDetailsSchema = new mongoose.Schema({
    name : String,
    email : String,
    idea_id : String,
    
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;