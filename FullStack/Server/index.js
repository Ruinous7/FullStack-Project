const express = require("express")
const app = express()
const cors = require("cors")
require("./configs/database")
app.use(express.json())
app.use(cors())

const UsersRouter = require("./routers/UsersRouter")
const MembersRouter = require("./routers/MembersRouter")
const SubscriptionsRouter = require("./routers/SubscriptionsRouter")
const MoviesRouter = require("./routers/MoviesRouter")

app.use("/users", UsersRouter)
app.use("/members", MembersRouter)
app.use("/subscriptions", SubscriptionsRouter)
app.use("/movies", MoviesRouter)

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
