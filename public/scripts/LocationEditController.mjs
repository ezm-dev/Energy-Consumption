import { LocationModel } from "./LocationModel.mjs";
import { AppliancesModel } from "./AppliancesModel.mjs";


/**
 * LocationEditController class (frontend) - for rendering Edit-Location page and handeling inputs functionality.
 */
export class LocationEditController {

    static locationId = ""

    //Data from back-end 
    static appliancesList = []
    static productionList = []


    static {
        // Get the location id from the query string
        //built in  JS webbrowser, pull apart querystring and url
        //return query string
        const urlParams = new URLSearchParams(window.location.search)
        //return id from query string
        this.locationId = urlParams.get("id")
        //console.log(this.locationId)

        //validation & sanitization location-name-input
        document.getElementById("location-name").addEventListener("input", (e) => {

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

             //e.target.value =e.target.value.replace(/[`'";\\\\x00%00<>&\/\\|$(){}!:%?#@\[\]*.+\^\r\n%0A%0D/g, '');
              e.target.value = e.target.value.replace(/[<>`~!@#$%^&*(){}_+=|?'",.;:\[\]\\\/\s0-9]/g, '');



            /*
             *2- validation- filter what we want - letters & - only.
             * /^[a-zA-Z\-]{2,}$/
             */
            if (/^[a-zA-Z\-]{2,}$/.test(e.target.value)) {
                document.getElementById("save-location").disabled = false
                document.getElementById("save-location").style.cursor = "pointer"
            }
            else {

                document.getElementById("save-location").disabled = true
                document.getElementById("save-location").style.cursor = "not-allowed"
            }

        })

        //validation & sanitisation of hours-input
        document.getElementById("hours").addEventListener("input", (e) => {
            //sanitisation
            //  e.target.value=e.target.value.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\\/\s]/gi, '');
            e.target.value = e.target.value.replace(/[^0-9]/g, '')

            //validation hours between 1,24 hours per day
            if (e.target.value == '' || (e.target.value < 1 || e.target.value > 24)) {
                e.target.value = "" // Clear the input if it goes out of range
                document.getElementById("add-button").disabled = true
                document.getElementById("add-button").style.cursor = "not-allowed"

            }

            else {
                if (document.getElementById("quantity").value == '' || (document.getElementById("quantity").value < 1 || document.getElementById("quantity").value > 100)) {
                    document.getElementById("add-button").disabled = true
                    document.getElementById("add-button").style.cursor = "not-allowed"
                }
                else {
                    //document.getElementById("save-location").disabled=false
                    document.getElementById("add-button").disabled = false
                    document.getElementById("add-button").style.cursor = "pointer"
                }
            }

        })




        //validation & sanitisation of quantity-input
        document.getElementById("quantity").addEventListener("input", (e) => {
            //sanitisation
            // e.target.value=e.target.value.replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\\/\s]/gi, '');
            e.target.value = e.target.value.replace(/[^0-9]/g, '')

            //validation quantity between 1,100 
            if (e.target.value == '' || (e.target.value < 1 || e.target.value > 100)) {
                e.target.value = "" // Clear the input if it goes out of range
                document.getElementById("add-button").disabled = true
                document.getElementById("add-button").style.cursor = "not-allowed"

            }

            else {
                if (document.getElementById("hours").value == '' || (document.getElementById("hours").value < 1 || document.getElementById("hours").value > 24)) {
                    document.getElementById("add-button").disabled = true
                    document.getElementById("add-button").style.cursor = "not-allowed"
                }
                else {
                    //document.getElementById("save-location").disabled=false
                    document.getElementById("add-button").disabled = false
                    document.getElementById("add-button").style.cursor = "pointer"
                }
            }

        })


        //setup  events  save 
        document.getElementById("save-location").addEventListener("click", () => {

            //save only if the button is enabled
            if (document.getElementById("save-location").disabled == false) {
                this.saveLocation()
            }
            else {
                alert("location can't be saved!")
            }



        })

        //setup cancel
        document.getElementById("back-button").addEventListener("click", () => {
            // window.location.href=""
            history.back()


        })


        //Add appliances button
        document.getElementById("add-button").addEventListener("click", () => {
            this.addAppliancesDetails()

        })


        //initial render  --initial version
        // loadd appliances then fill select
        this.loadAppliancesFromBackEnd().then(() => {

            this.fillAppliancesSelect()
        })


        this.renderLocation()

        //add entries
        this.renderAppliancesEnteries()

    }


    //Save location and (go back to the list)

    static saveLocation() {
        //load the location instance
        const location = LocationModel.getByID(this.locationId)
        //check if there is no location
        if (location != null) {
            //Update the location instance all values
            // take from textBoxes and inputs and update the location values before update
            const locationName = document.getElementById("location-name")
            location.name = locationName.value
            const locationState = document.getElementById("location-state")
            console.log("locationState")
            console.log(locationState.value)
            location.state = locationState.value
            // Add the rest of input fields select 
            //update the location instance back to the local storage
            LocationModel.update(location)
            //redirect
            window.location = "/views/location_list.html"
        }
        else {
            alert("The location details couldn't be saved!")
        }
    }

    // render location (show name , state on the page) 
    static renderLocation() {
        const location = LocationModel.getByID(this.locationId)

        //check if location is null 
        if (location != null) {
            const locationName = document.getElementById("location-name")
            const locationState = document.getElementById("location-state")
            locationState.value = location.state
            locationName.value = location.name
        }
        else {
            alert("The location details couldn't be retrieved!")
        }


    }

    //load the appliances from the backend
    static loadAppliancesFromBackEnd() {
        return fetch("/appliances/list")
            .then(response => response.json())
            .then(productsResults => {
                this.appliancesList = productsResults
                // console.log("this.appliancesList")
                // console.log(this.appliancesList)

            })


    }


    static fillAppliancesSelect() {
        const devices = document.getElementById("devices")
        devices.innerHTML = ""

        ///Fill the select with appliances
        for (let i = 0; i < this.appliancesList.length; i++) {
            let option = document.createElement("option"); // Create a new <option> element
            option.text = this.appliancesList[i].name; // appliance.name
            option.value = this.appliancesList[i].watts; // appliance.watts
            // Append the option to the select element
            devices.appendChild(option);
        }

    }

    static addAppliancesDetails() {
        // console.log("creating")
        const hours = document.getElementById("hours").value
        const quantity = document.getElementById("quantity").value

        //select 
        const selectedAppliance = document.getElementById("devices")
        //select - get Selected option name
        //Reference: Bar, R. (2021). How can I access the property name’s value in select box by clicking select option? [online] Stack Overflow. Available at: https://stackoverflow.com/questions/67917958/how-can-i-access-the-property-names-value-in-select-box-by-clicking-select-opti [Accessed 10 Oct. 2024].
        //const selected = e.target.options[e.target.selectedIndex]
        let applianceName = selectedAppliance.options[selectedAppliance.selectedIndex].text;
        //select - get Selected  value
        let applianceWatts = selectedAppliance.value

        // console.log(hours)
        // console.log(quantity)
        // console.log(applianceName)
        // console.log(applianceWatts)
        //add this appliance to list & entries[]
        //update & render
        const location = LocationModel.getByID(this.locationId)

        ///add the new appliance to the location - 
        const addAppliance = new AppliancesModel(null, applianceName, hours, quantity, applianceWatts)

        //Add Appliance to the location 
        LocationModel.addAppliance(location, addAppliance)

        this.renderAppliancesEnteries()
    }

    //Render appliance list
    static renderAppliancesEnteries() {

        //  <section id="list-area">
        //         <article>
        //          <span>Quantity </span>
        //          <span>Name </span> for
        //          <span>hours </span> hrs
        //          <input type="button" value="X">
        //         </article
        //       </section>


        const entries = LocationModel.getByID(this.locationId)
        const appliances = entries.appliances
        //list-area
        const listArea = document.getElementById("list-area")
        listArea.innerHTML = ""
        for (const appliance of appliances) {


            //list-item(item): details & button
            const listItem = document.createElement("article")
            listItem.className = "list-item"

            //details(item-details)
            const details = document.createElement("span")
            details.innerText += " " + appliance.quantity
            details.innerText += "  " + appliance.name
            details.innerText += " for " + appliance.hours + " hrs "
            details.innerText += " x (" + appliance.watts + ") WHs"
            details.className = "item-details"
            listItem.appendChild(details)


            //button (item-button)
            const button = document.createElement("input")
            button.type = "button"
            button.value = "X"
            button.className = "item-button"
            button.addEventListener("click", () => {
                LocationModel.deleteApplaince(this.locationId, appliance.id)
                this.renderAppliancesEnteries()
            })
            listItem.appendChild(button)

            listArea.appendChild(listItem)
        }

    }


}