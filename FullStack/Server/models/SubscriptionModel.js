const mongoose = require("mongoose")

const SubscriptionSchema = mongoose.Schema({
    id: Number,
    movieID: Number,
    memberID: Number,
    date: String

})


module.exports = mongoose.model("Subscription", SubscriptionSchema)