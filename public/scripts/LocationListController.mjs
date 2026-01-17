import { LocationModel } from "./LocationModel.mjs";

/**
 * LocationListController class (frontend) - for rendering Locations page and handeling inputs functionality.
 */
export class LocationListController {
    static searchTerm = ""
    static total = 0

    static {
        //setup event listener here 
        document.getElementById("create-location").addEventListener('click', (e) => {
            this.createNewLocation()
        })

        //trigger initial load and render here
        this.renderLocations()

        //add event listener on search
        document.getElementById("search").addEventListener("input", (e) => {
            //LocationListController.searching(e.target.value)
            /*
             * 1- sanitisation - replacing unwanted characters with ''
             * e.g. ` ' " ; \ \x00 %00 < > & / \ | $ ( ) { } ! : % ? # @ [ ] * . + ^ \r \n %0A %0D
             *  
             * References:
             * ----------
             * - Security Cipher. (2023). Input Sanitization Techniques for Secure Coding. 
             * [online] Available at: https://securitycipher.com/docs/security/security-resources/input-sanitization-secure-coding/ [Accessed 14 Oct. 2024].
             * 
             * - Piyush Kumawat (securitycipher (2023). Input Sanitization Techniques for Secure Coding - Piyush Kumawat (securitycipher) - Medium. 
             * [online] Medium. Available at: https://securitycipher.medium.com/input-sanitization-techniques-for-secure-coding-76aff4b8e0ce [Accessed 14 Oct. 2024].
             * 
             * -www.php.net. (n.d.). PHP: Sanitize filters - Manual. 
             * [online] Available at: https://www.php.net/manual/en/filter.filters.sanitize.php.
             * 
             */

            //sanitization from SQL injection and cross site scripting
            e.target.value = e.target.value.replace(/[<>`~!@#$%^&*(){}_+=|?'",.;:\[\]\\\/\s0-9]/g, '');

            //validation using only (letters, - )
            if (/^[a-zA-Z\-]*$/.test(e.target.value)) {
                LocationListController.searching(e.target.value)
                // e.target.style.borderColor="green"
            }
            else {
                e.target.style.borderColor = "red"
                // console.error("Invalid pattern")
                document.getElementById("search-msg").innerText = "Error! enter valid loaction name(letters -)only!"
                document.getElementById("search-msg").style.color = "red"
            }
            this.renderLocations()
            // console.log("search")

        })

    }


    // handle filter locations
    static searching(searchTerm) {
        this.searchTerm = searchTerm
    }
    static getResults() {
        const locations = LocationModel.getAll()
        return locations.filter(l => this.searchTerm == "" || l.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
    }

    static renderLocations() {

        let locations = this.getResults()
        console.log(locations)

        //find the list on the page 
        const locationList = document.getElementById("location-list")

        //clear the list
        locationList.innerHTML = ""

        //loop for each location in local storage

        for (const location of locations) {

            let wattHoursTotal = 0
            let appliancesTotal = 0

            //locationsSeacrhResults ---location after search
            // for (let i = 0; i < location.appliances.length; i++) {
            appliancesTotal = LocationModel.totalApplainces(location.id)
            wattHoursTotal = LocationModel.totalWatts(location.id)
            this.total = wattHoursTotal

            const locationItem = document.createElement("article")
            locationItem.className = "location-item"

            //location Info
            const locationInfo = document.createElement("section")
            locationInfo.className = "location-info"

            const heading = document.createElement("h2")
            heading.innerText = location.name
            locationInfo.appendChild(heading)

            const state = document.createElement("p")
            state.innerText = location.state
            locationInfo.appendChild(state)

            const wattHours = document.createElement("p")
            wattHours.innerText = wattHoursTotal
            wattHours.innerText += " WHs/day"
            locationInfo.appendChild(wattHours)

            const applianceCount = document.createElement("p")
            applianceCount.innerText = appliancesTotal
            applianceCount.classList.add("span-list")
            applianceCount.innerText += " Appliances."
            locationInfo.appendChild(applianceCount)

            //add location info
            locationItem.appendChild(locationInfo)

            //location buttons
            const locationButtons = document.createElement("section")
            locationButtons.className = "location-buttons"
            //Stats button
            const statsButton = document.createElement("input")
            statsButton.type = "button"
            statsButton.value = "Stats"
            statsButton.className = "list-btn"
            statsButton.addEventListener("click", () => {
                this.statsLocation(location.id, wattHoursTotal)
            })
            //disable stats button if no appliances added for the location
            if (wattHoursTotal > 0) {
                statsButton.disabled = false
                statsButton.style.cursor = "pointer"

            }
            else {
                statsButton.disabled = true
                statsButton.style.cursor = "not-allowed"

            }

            locationButtons.appendChild(statsButton)
            // Edit button
            const editButton = document.createElement("input")
            editButton.type = "button"
            editButton.value = "Edit"
            editButton.className = "list-btn"
            editButton.addEventListener("click", () => {
                this.editLocation(location.id)
            })
            locationButtons.appendChild(editButton)

            //add locationButtons
            locationItem.appendChild(locationButtons)

            //add item(info, buttons) to the list
            locationList.appendChild(locationItem)
        }

    }

    static editLocation(id) {
        //reditrect to edit page for that location
        window.location = "/views/location_edit.html?id=" + id

    }
    static statsLocation(id, total) {
        // window.location = "/views/location_stats.html?id=" + id

        window.location = "/views/location_stats.html?id=" + id + "&total=" + total
    }


    // Create new location and go to edit
    static createNewLocation() {
        //create a blank location model and store it
        const location = new LocationModel(null, "", "Queensland", [])
        LocationModel.create(location)

        //reditrect to edit page for that blanck location model
        //window.location = "/views/location_edit.html?id="+location.id
        this.editLocation(location.id)
    }

}