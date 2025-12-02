import { ApplianceModel } from "../models/ApplianceModel.mjs";
/**
 * ApplianceController class retrieves the list of appliances consumptions from the backend | Error message if not found.
 */
export class ApplianceController {
    /**
     * Get a list of appliances from the backend
     * @param {object} req  -Request object.
     * @param {object} res  -Response contains a list of appliances in JSON format| Error if appliances list is not found.
     */
    static getApplianceListJSON(req, res) {
        const result = ApplianceModel.select()
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(500).json({
                message: "Appliances list is not found!"
            })
        }

    }


}