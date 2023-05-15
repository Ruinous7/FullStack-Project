const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    id: Number,
    admin: Boolean,
    fullName: String,
    username: String,
    password: String
})


module.exports = mongoose.model("User", UserSchema)