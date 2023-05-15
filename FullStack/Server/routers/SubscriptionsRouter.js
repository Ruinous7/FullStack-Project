const express = require("express")

const router = express.Router()

const BLL = require("../BLL/SubscriptionBLL")

router.get("/",  async (req,res) => {
    const subscriptions = await BLL.getAll()
    res.status(200).json(subscriptions)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const subscription = await BLL.getSubscription(id)
    res.status(200).json(subscription)
})

router.post("/", async (req,res) => {
    const obj = req.body
    const status = await BLL.addSubscription(obj)
    res.json(status)
})

router.put("/:id", async (req,res) => {
    const id = req.params.id
    const obj = req.body
    const status = await  BLL.updateSubscription(id, obj)
    res.json(status)

})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    const status =  await BLL.deleteSubscription(id)
    res.json(status)
})

module.exports = router
