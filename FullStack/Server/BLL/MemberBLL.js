const MemberModel = require("../models/MemberModel")

const getAll = async () => {
    const members = await MemberModel.find({})
    return members
}

const getMember = async (id) => {
    const member = await MemberModel.findOne({id:id})
    return member
}

const addMember = async (obj) => {
    const member = new MemberModel(obj)
    await member.save()
    return "Created"
}

const updateMember = async (id, obj) => {
   await MemberModel.findOneAndUpdate({id:id}, obj)
   return 'Updated'
}

const deleteMember = async (id) => {
   await MemberModel.findOneAndDelete({id:id})
   return 'Deleted'
}

module.exports = {
    addMember,
    deleteMember,
    getAll,
    getMember,
    updateMember
}