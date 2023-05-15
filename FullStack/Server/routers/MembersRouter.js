const express = require("express")

const router = express.Router()

const BLL = require("../BLL/MemberBLL")

router.get("/",  async (req,res) => {
    const members = await BLL.getAll()
    res.status(200).json(members)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const member = await BLL.getMember(id)
    res.status(200).json(member)
})

router.post("/", async (req,res) => {
    const obj = req.body
    const status = await BLL.addMember(obj)
    res.json(status)
})

router.put("/:id", async (req,res) => {
    const id = req.params.id
    const obj = req.body
    const status = await  BLL.updateMember(id, obj)
    res.json(status)

})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    const status =  await BLL.deleteMember(id)
    res.json(status)
})

module.exports = router
