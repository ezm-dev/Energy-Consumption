import express from "express"
import path from "path"
import applianceRoutes from "./routes/appliance.mjs"
import nationalRoutes from "./routes/national.mjs"
import leaderboardRoutes from "./routes/leaderboard.mjs"
import nationalStatsRoutes from "./routes/nationalstats.mjs"

//Creating a new server application (server)
const app = express()

//Setup view engine
app.set("view engine", "ejs")
//app.set("views","src/views")
app.set("views", path.join(import.meta.dirname, "/views"))



//Setup the middlewear 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setup  serving pf public files
app.use(express.static("src/public"))



//Setup routes
app.use("/appliances", applianceRoutes)
app.use("/national", nationalRoutes)
app.use("/leaderboard", leaderboardRoutes)
app.use("/nationalstats", nationalStatsRoutes)

//redirect / to homepage
app.get("/", (req, res) => {
    res.redirect("/views/location_list.html")
})


//Start server
const port = 8080
app.listen(port, () => {
    console.log("Server Started on: http://localhost:" + port)
})