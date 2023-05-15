const SubscriptionModel = require("../models/SubscriptionModel")

const getAll = async () => {
    const subscriptions = await SubscriptionModel.find({})
    return subscriptions
}

const getSubscription = async (id) => {
    const subscription = await SubscriptionModel.findOne({id:id})
    return subscription
}

const addSubscription = async (obj) => {
    const subscription = new SubscriptionModel(obj)
    await subscription.save()
    return "Created"
}

const updateSubscription = async (id, obj) => {
   await SubscriptionModel.findOneAndUpdate(id, obj)
   return 'Updated'
}

const deleteSubscription = async (id) => {
   await SubscriptionModel.findOneAndDelete(id)
   return 'Deleted'
}

module.exports = {
    addSubscription,
    deleteSubscription,
    getAll,
    getSubscription,
    updateSubscription
}