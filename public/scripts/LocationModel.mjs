import { AppliancesModel } from "./AppliancesModel.mjs"

/**
 * The LocationModel class stores a list of locations in localStorage
 * and the instances represent a single location with location-name and list of appliances.
 * The standard CRUD methods are provided.
 *
 */
export class LocationModel {
    //Check if the local storage is not exist and create it if it doesn't exist.
    static {
        if (localStorage.getItem("locations") == null) {
            const entries = []
            localStorage.setItem("locations", JSON.stringify(entries))
        }

    }

    /**
     * Stores a new location in localStorage.
     * @param {object} entry- the location to store in localStorage.
     */
    static create(entry) {
        //load locations list  from local storage
        const entries = JSON.parse(localStorage.getItem("locations"))

        //add location to it
        entries.push(entry)

        //save the list back to localstorage
        localStorage.setItem("locations", JSON.stringify(entries))
    }

    /**
     * 
     * @param {object} entry- the location to be updated
     */
    static update(entry) {
        //load locations list  from local storage
        const entries = JSON.parse(localStorage.getItem("locations"))

        //for of loop can't change things, we have to make it normal for loop
        //-loop through the list.
        //-find location with matching ID(that we want to update)
        //-we replace  the old version with new one
        for (let index = 0; index < entries.length; index++)
            if (entries[index].id == entry.id) {
                entries[index] = entry
                break
            }

        //save the list back to localstorage
        localStorage.setItem("locations", JSON.stringify(entries))


    }

    /**
     * Add appliance to the location
     * @param {object} location - the location the appliance will be added to. 
     * @param {*} appliance  - the appliance that will be added.
     */
    static addAppliance(location, appliance) {
        location.appliances.push(appliance)
        LocationModel.update(location)

    }

    /**
     * Delete appliance by id
     * @param {string} locationId - the id of the location that contains the appliance.
     * @param {number} id - the id of the appliance that will be deleted.
     */
    static deleteApplaince(locationId, id) {
        const location = LocationModel.getByID(locationId)
        if (location) {
            location.appliances = location.appliances.filter(app => app.id != id)
            LocationModel.update(location)
        }
        else {
            alert("The appliance couldn't be deleted! ")
        }
    }

    /**
     * Calculate the number of appliances at this location
     * @param {string} locationId - the id of the location that contains the appliances.
     * @returns {number} - the number of appliances at this location.
     */
    static totalApplainces(locationId) {
        let totalApplainces = 0
        const location = LocationModel.getByID(locationId)
        if (location) {
            for (let i = 0; i < location.appliances.length; i++) {
                totalApplainces += parseInt(location.appliances[i].quantity)
            }
            return totalApplainces
        }
        else {
            alert("Total number of appliances couldn't be calculated for that location!")
            return null
        }

    }

    /**
     * Get total energy consumption at this location
     * @param {String} locationId - the id of the location.
     * @returns {number} - total energy consumption at this location.
     */
    static totalWatts(locationId) {
        let totalWatts = 0
        const location = LocationModel.getByID(locationId)
        if (location) {
            for (let i = 0; i < location.appliances.length; i++) {
                totalWatts += parseInt(location.appliances[i].watts * location.appliances[i].quantity * location.appliances[i].hours)
            }
            return totalWatts
        }
        else {
            alert("Total energy consumption couldn't be calculated for that location!")
            return null
        }
    }



    /**
     * Delete location by id.
     * @param {String} id - the id  of the location.
     */
    static delete(id) {
        //load  list from localStorage
        //load locations list  from local storage
        const entries = JSON.parse(localStorage.getItem("locations"))

        //filter out the entries to be deleted
        entries = entries.filter(l => l.id != id)

        //save the list to localstorage
        localStorage.setItem("locations", JSON.stringify(entries))
    }

    /**
     * Get a list of locations from localStorage.
     * 
     * @returns {[object]} - the list of all locations.
     */
    static getAll() {
        //Need to use  constructor so objects have methods
        const entries = JSON.parse(localStorage.getItem("locations"))
        return entries.map(e => new LocationModel(e.id, e.name, e.state, e.appliances))
    }


    /**
     * Search localStorage for a location with a matching ID.
     * 
     * @param {string} id- the location Id to search for.
     * @returns {object | null}-the location instance if found, or null otherwise.
     */
    static getByID(id) {
        //load locations from local storage
        const entries = JSON.parse(localStorage.getItem("locations"))

        //find the entry with matched id 
        const entry = entries.find(e => e.id == id)

        //if there is match construct it else return null if (entry !=null)
        if (entry) {
            //construct the model object out of the entry( reconstruct it to get its functions back)
            return new LocationModel(
                entry.id,
                entry.name,
                entry.state,
                entry.appliances)
        }
        else {
            return null
        }

    }


    //member fields
    /**
     * 
     * ID (uuid) of the location- unique across all locations
     */
    id = ""

    /**
     * Location name 
     */
    name = ""

    /**
     * Location State - must be from national sources state list.
     */
    state = ""


    /**
     * contains :{
     * name: "",
     * hours:0.0,
     * quantity:0,
     * watts: 0
     * }
     * @type {[Objects]} 
     */
    appliances = []

    /**
     * Construct a new location instance
     * 
     * @param {String} -id string or null to generate a new id.
     * @param {String}- name of the location.
     * @param {String} - state of the location.
     * @param {[Objects]} - appliances list.
     */
    constructor(id, name, state, appliances) {
        this.id = id ?? window.crypto.randomUUID()
        this.name = name
        this.state = state
        this.appliances = appliances
    }


}

//testing
//LocationModel.create(new LocationModel(null, "Home", "Queensland", AppliancesModel.getAll()))
// LocationModel.create(new LocationModel(null, "TEST", "Queensland", [
//     new AppliancesModel(null,"oven",2,5,1000),
//     new AppliancesModel(null,"computer",2,5,2000),
//     new AppliancesModel(null,"Toaster",2,5,4000)
// ]
// ))
//console.log(LocationModel.getAllOld()
// console.log(LocationModel.getAll())
//console.log(LocationModel.getAll())
// const LocationtoUpdate = LocationModel.getByID("e9bbf82a-5b7d-4d26-af78-64b1ee991693")
// LocationtoUpdate.name ="Work"
// LocationModel.update(LocationtoUpdate)


