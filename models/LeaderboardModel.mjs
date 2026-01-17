import { DataModel } from "./DataModel.mjs";

/**
 * LeaderboardModel class stores the posted leaderboard records.
 * @extends DataModel
 */

export class LeaderboardModel extends DataModel {
    
    userKey = ""//unique for each location data (for each user)
    state = ""
    windConsumption = 0.0
    solarConsumption = 0.0
    gasConsumption = 0.0
    coalConsumption = 0.0

    /**
     * Create instance of LeaderboardModel
     * @param {string} userKey - unique key for the user location.
     * @param {string} state - state of the user location.
     * @param {number} windConsumption - wind consumption of the location.
     * @param {number} solarConsumption - solar consumption of the location.
     * @param {number} gasConsumption  - gas consumption of the location.
     * @param {number} coalConsumption - coal consumption of the location.
     */
    constructor(userKey, state, windConsumption, solarConsumption, gasConsumption, coalConsumption) {
        super()
        this.userKey = userKey
        this.state = state
        this.windConsumption = windConsumption
        this.solarConsumption = solarConsumption
        this.gasConsumption = gasConsumption
        this.coalConsumption = coalConsumption

    }

}



//testing: initial resutls for leaderboard
// LeaderboardModel.insert(new LeaderboardModel("100","Queensland",100,200,300,400))
// LeaderboardModel.insert(new LeaderboardModel("200","Tasmania",500,600,700,800))
// LeaderboardModel.insert(new LeaderboardModel("300","Victoria",500,600,700,800))
//console.log(LeaderboardModel.select())

// LeaderboardModel.delete(l=> l.userKey=="100")
// console.log(LeaderboardModel.select())


