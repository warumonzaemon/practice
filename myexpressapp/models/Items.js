const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ItemsSchema = new Schema({
    name: String,
    status: String
})
module.exports = mongoose.model('Items', ItemsSchema );