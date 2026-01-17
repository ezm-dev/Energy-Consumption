import { DataModel } from "./DataModel.mjs";


/**
 * ApplianceModel class stores a list of appliances and their consumptions.
 * @extends DataModel.
 */
export class ApplianceModel extends DataModel {
    //1-Set member fields & constructor
    name = "";  
    watts = 0;

    /**
     * Create appliance instance
     * @param {string} name - name of appliance.
     * @param {number} watts - Consumption of an appliance in watts.
     * 
     */
    constructor(name, watts) {
        super()
        this.name = name
        this.watts = watts
    }

}


//2- Set DataSource 
// you can't copy it as literlas, as it will not constructed as model objects.
ApplianceModel.setDataSource([
    new ApplianceModel("Refrigerator", 100),
    new ApplianceModel("Air Conditioner", 350),
    new ApplianceModel("Heater", 1500),
    new ApplianceModel("Washing Machine", 500),
    new ApplianceModel("Dryer", 3000),
    new ApplianceModel("Dishwasher", 1800),
    new ApplianceModel("Oven", 2150),
    new ApplianceModel("Microwave", 1000),
    new ApplianceModel("Toaster", 800),
    new ApplianceModel("Coffee Maker", 900),
    new ApplianceModel("Television", 150),
    new ApplianceModel("Computer", 200),
    new ApplianceModel("Lamp", 60)
])


//console.log(ApplianceModel.select())
//console.log(ApplianceModel.select(a => a.watts>500))