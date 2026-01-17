/**
 * AppliancesModel  class store list of appliances for the location in localstorage
 */
export class AppliancesModel {

  static entries = []
  /**
   * Get a list of all appliances details.
   * @returns {[object]} - return list of appliances.
   */
  static getAll() {
    return entries.map(e => new AppliancesModel(e.id, e.name, e.hours, e.quantity, e.watts))
  }

  /**
   * Create appliance record.
   * @param {object} entry - appliance entery.
   */
  static create(entry) {
    this.entries.push(entry)
  }

  /**
   * Delete the appliance using id.
   * @param {number} id -  id of the appliance.
   */
  static delete(id) {

    this.entries = this.entries.filter(e => e.id != id)
  }

  id = 0 //timestamp
  name = ""
  hours = 0.0 // user input
  quantity = 0 //user input
  watts = 0 //from back end

  /**
   * Create instance of the appliance.
   * @param {number} id - unique id of the appliance.
   * @param {string} name - name of the appliance.
   * @param {number} hours - hours of consumption of the appliance 
   * @param {number} quantity -number of the appliance at the location.
   * @param {number} watts - energy consumption of the appliance(per hour).
   */

  constructor(id, name, hours, quantity, watts) {
    this.id = id ?? Date.now()
    this.name = name
    this.hours = hours
    this.quantity = quantity
    this.watts = watts
  }



}

//Testing:
// console.log("***Testing AppliancesModel*****")
// const app1 = new AppliancesModel(null,"oven",2,1,1000)
// AppliancesModel.create(app1)
// const app2 = new AppliancesModel(null,"computer",4,1,2000)
// AppliancesModel.create(app2)
// console.log(AppliancesModel.getAll())
// AppliancesModel.delete("app1.name")
// console.log(AppliancesModel.getAll())
// console.log("***END Testing Appliances Model***")