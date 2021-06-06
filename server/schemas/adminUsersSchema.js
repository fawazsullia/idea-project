const mongoose = require('mongoose');

//contains schema for storing ideas

const adminUsersSchema = new mongoose.Schema({
    userName : String,
    hash: String



});

const AdminUsers = mongoose.model('AdminUsers', adminUsersSchema);

module.exports = AdminUsers;