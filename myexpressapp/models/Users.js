const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    name: String,
    role: String
})
module.exports = mongoose.model('Users', UsersSchema );
