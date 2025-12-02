import express from "express"
import { NationalStatsController } from "../controllers/NationalStatsController.mjs"

const nationalStatsRoutes = express.Router()

nationalStatsRoutes.get("/list",NationalStatsController.viewNationalStats )

export default nationalStatsRoutes