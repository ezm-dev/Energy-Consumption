import { NationalSourceModel } from "../models/NationalSourceModel.mjs";

/**
 * NationalSourcesController class retrieve the national sources production list.
 */
export class NationalSourcesController {

    /**
     * Get a list of national sources production.
     * @param {object} req - Request object.
     * @param {object} res - Response contains a list of national sources production in JSON format| Error if the list is not found.
     */

    static getNationalSourcesJSON(req, res) {
        const result = NationalSourceModel.select()
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(500).json({
                message: "National production list is not found!"
            })
        }


    }

}