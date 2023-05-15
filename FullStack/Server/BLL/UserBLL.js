const UserModel = require("../models/UserModel")

const getAll = async () => {
    const users = await UserModel.find({})
    return users
}

const getUser = async (id) => {
    const user = await UserModel.findOne({id:id})
    return user
}

const addUser = async (obj) => {
    const user = new UserModel(obj)
    await user.save()
    return "Created"
}

const updateUser = async (id, obj) => {
   await UserModel.findOneAndUpdate({id:id}, obj)
   return 'Updated'
}

const deleteUser = async (id) => {
   await UserModel.findOneAndDelete({id:id})
   return 'Deleted'
}

module.exports = {
    addUser,
    deleteUser,
    getAll,
    getUser,
    updateUser
}