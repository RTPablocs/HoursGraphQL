const mongoose =require("mongoose");
const {Schema} = mongoose;

const hourSchema = new Schema({
    user: String,
    start: Date,
    end: Date,
})

const Hour = mongoose.model('hours', hourSchema)

module.exports = {Hour}