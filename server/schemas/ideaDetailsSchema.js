const mongoose = require('mongoose');

//contains schema for storing ideas

const ideaDetailsSchema = new mongoose.Schema({
    title : String,
    description : String,
    name : String,
    email : String,
    social : String,
    taken : Boolean,
    created_at : Date,
    isValidated : Boolean



});

const IdeaDetails = mongoose.model('IdeaDetails', ideaDetailsSchema);

module.exports = IdeaDetails;