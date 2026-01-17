import { DataModel } from "./DataModel.mjs";


/**
 * NationalSourceModel class stores the national source production records.
 * @extends DataModel
 */
export class NationalSourceModel extends DataModel{
    state = "" 
    windProportion = 0.0
    solarProportion = 0.0
    gasProportion = 0.0
    coalProportion = 0.0

    /**
     * Create instance of NationalSourceModel.
     * @param {string} state - the name of the state.
     * @param {number} windProportion - the wind production proportion of the state.
     * @param {number} solarProportion -the solar production proportion of the state.
     * @param {number} gasProportion -the gas production proportion of the state.
     * @param {number} coalProportion -the coal production proportion of the state.
     */
    constructor(state, windProportion, solarProportion, gasProportion,coalProportion){
        super()
        this.state = state
        this.windProportion = windProportion
        this.solarProportion = solarProportion
        this.gasProportion = gasProportion
        this.coalProportion = coalProportion
    }
   
}

NationalSourceModel.setDataSource([
    new NationalSourceModel("Queensland", 10, 20,25,45),
    new NationalSourceModel("New South Wales", 12, 15, 25, 48),
    new NationalSourceModel("Victoria", 20, 22,30, 28),
    new NationalSourceModel("Western Australia", 15, 20, 35, 30),
    new NationalSourceModel("South Australia", 40, 30, 20, 10),
    new NationalSourceModel("Tasmania", 60, 20, 10, 10),
    new NationalSourceModel("Australian Capital Territory", 30, 40, 20, 10),
    new NationalSourceModel("Northern Territory", 20, 30, 40, 10)
])



