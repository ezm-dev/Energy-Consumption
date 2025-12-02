import { LeaderboardModel } from "../models/LeaderboardModel.mjs";

/**
 * NationalStatsController class for rendering the national stats view.
 */
export class NationalStatsController {

    /**
     * Rendering national-stats view
     * @param {object} req - Request object.
     * @param {object} res - Response with rendered"national-stats.ejs" page.
     */
    static viewNationalStats(req, res) {
        res.status(200).render("national_stats.ejs", {
            items: LeaderboardModel.select()
        })
    }

}