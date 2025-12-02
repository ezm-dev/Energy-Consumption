
import express from "express"
import { NationalSourcesController } from "../controllers/NationalSourcesController.mjs"

const nationalRoutes = express.Router()

nationalRoutes.get("/list",NationalSourcesController.getNationalSourcesJSON)

export default nationalRoutes