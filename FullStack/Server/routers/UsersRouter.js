const express = require("express")

const router = express.Router()

const BLL = require("../BLL/UserBLL")

router.get("/",  async (req,res) => {
    const users = await BLL.getAll()
    res.status(200).json(users)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const user = await BLL.getUser(id)
    res.status(200).json(user)
})

router.post("/", async (req,res) => {
    const obj = req.body
    const status = await BLL.addUser(obj)
    res.json(status)
})

router.put("/:id", async (req,res) => {
    const id = req.params.id
    const obj = req.body
    const status = await  BLL.updateUser(id, obj)
    res.json(status)

})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    const status =  await BLL.deleteUser(id)
    res.json(status)
})

module.exports = router
