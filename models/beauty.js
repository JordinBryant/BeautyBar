const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    img: String,
    time: Number,
    category: String,
});
 
const Service = mongoose.model('Service', serviceSchema);

module.exports= Service;











