const mongoose = require("mongoose")

const MovieSchema = mongoose.Schema({
    id: Number,
    name: String,
    premiere: String,
    genres: Array,
    image: String,
    display: Boolean

})


module.exports = mongoose.model("Movie", MovieSchema)