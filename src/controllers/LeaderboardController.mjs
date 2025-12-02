import { LeaderboardModel } from "../models/LeaderboardModel.mjs";

/**
 * LeaderboardController class for handeling LeaderboardModel CRUD operations.
 */
export class LeaderboardController {
    /**
     * Get all leaderboard records.
     * @param {object} req - Request object.
     * @param {object} res - Response with all leaderboard records in JSON.
     */
    static getAllLeaderboardJSON(req, res) {
        res.status(200).json(LeaderboardModel.select())
    }

    /**
     * Get a leaderboard record by id.
     * @param {object} req - Request object contains leaderboard id that will be retrieved.
     * @param {object} res - Response with a leaderboard record by id.
     */
    static getById(req, res) {
        res.status(200).json(LeaderboardModel.select(l => l.userKey == req.params.id))
    }

    /**
     * Create leaderboard record.
     * @param {object} req - Request object contains Leaderbord record details.
     * @param {object} res - Response object with creating record message.
     */
    static insertInLeaderboard(req, res) {
        //Reconstruct object from body then insert.
        const record = new LeaderboardModel(
            req.body.userKey,
            req.body.state,
            req.body.windConsumption,
            req.body.solarConsumption,
            req.body.gasConsumption,
            req.body.coalConsumption)

        LeaderboardModel.insert(record)
        res.status(200).json({
            message: "Record created!"
        })

    }

    /**
     * Update leaderboard record using id.
     * @param {object} req - Request object contains leaderbord updated record details.
     * @param {object} res - Response object with updating record message.
     */

    static updateLeaderboardById(req, res) {
        //Recontruct before update.
        const record = new LeaderboardModel(
            req.body.userKey,
            req.body.state,
            req.body.windConsumption,
            req.body.solarConsumption,
            req.body.gasConsumption,
            req.body.coalConsumption)
        const records = LeaderboardModel.select(l => l.userKey == req.body.userKey)
        if (records.length > 0) {
            LeaderboardModel.update(l => l.userKey == req.body.userKey, record)
            res.status(200).json({
                message: "Record updated!"
            })
        }
        else {
            res.status(404).json({
                message: "Record is not updated!"
            })

        }

    }

    /**
     * Delete leaderboardrecord using id.
     * @param {object} req - Request object contains leaderboard id that will be deleted.
     * @param {object} res - Response object with deleting record message.
     */

    static deleteLeaderboardById(req, res) {

        LeaderboardModel.delete(l => l.userKey == req.params.id)
        res.status(200).json({
            message: "Record is deleted!"
        })
    }

}




