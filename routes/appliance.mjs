import express from "express"
import { ApplianceController } from "../controllers/ApplianceController.mjs"

const applianceRoutes = express.Router()


applianceRoutes.get("/list", ApplianceController.getApplianceListJSON )

export default applianceRoutes