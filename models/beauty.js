const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    email: String,
    description: String,
    phone: Number,
    category: String,
    img: String,
});
 
const Service = mongoose.model('Service', serviceSchema);

module.exports= Service











