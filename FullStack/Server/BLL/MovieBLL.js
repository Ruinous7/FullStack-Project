const MovieModel = require("../models/MovieModel")

const getAll = async () => {
    const movies = await MovieModel.find({})
    return movies
}

const getMovie = async (id) => {
    const movie = await MovieModel.findOne({id:id})
    return movie
}

const addMovie = async (obj) => {
    const movie = new MovieModel(obj)
    await movie.save()
    return `Created ${obj.id}`
}

const updateMovie = async (id, obj) => {
   await MovieModel.findOneAndUpdate({id:id}, obj)
   return `Updated`
}

const deleteMovie = async (id) => {
   await MovieModel.findOneAndDelete({id:id})
   return `Deleted ${id}`
}

module.exports = {
    addMovie,
    deleteMovie,
    getAll,
    getMovie,
    updateMovie
}