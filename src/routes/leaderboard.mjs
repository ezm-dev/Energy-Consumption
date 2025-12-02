import express from "express"
import { LeaderboardController } from "../controllers/LeaderboardController.mjs"

const leaderboardRoutes = express.Router()

leaderboardRoutes.get("/list", LeaderboardController.getAllLeaderboardJSON)

leaderboardRoutes.get("/list/:id", LeaderboardController.getById)

leaderboardRoutes.post("/create", LeaderboardController.insertInLeaderboard)

leaderboardRoutes.put("/update",LeaderboardController.updateLeaderboardById)

leaderboardRoutes.delete("/delete/:id",LeaderboardController.deleteLeaderboardById)

export default leaderboardRoutes