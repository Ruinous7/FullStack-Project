const mongoose = require("mongoose")

const MemberSchema = mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    city: String,
})


module.exports = mongoose.model("Member", MemberSchema)