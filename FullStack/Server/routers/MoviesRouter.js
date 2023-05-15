const express = require("express")

const router = express.Router()

const BLL = require("../BLL/MovieBLL")

router.get("/",  async (req,res) => {
    const movies = await BLL.getAll()
    res.status(200).json(movies)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const movie = await BLL.getMovie(id)
    res.status(200).json(movie)
})

router.post("/", async (req,res) => {
    const obj = req.body
    const status = await BLL.addMovie(obj)
    res.json(status)
})

router.put("/:id", async (req,res) => {
    const id = req.params.id
    const obj = req.body
    const status = await BLL.updateMovie(id, obj)
    res.json(status)

})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    const status =  await BLL.deleteMovie(id)
    res.json(status)
})

module.exports = router
