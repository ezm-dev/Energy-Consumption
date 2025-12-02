import { LocationModel } from "./LocationModel.mjs";
import { AppliancesModel } from "./AppliancesModel.mjs";
// This model is used internally inside the controller to reconstruct the object

class LeaderboardModel {
  userKey = "" //unique for each location data (for each user)
  state = ""
  windConsumption = 0.0
  solarConsumption = 0.0
  gasConsumption = 0.0
  coalConsumption = 0.0

  constructor(userId, state, windConsumption, solarConsumption, gasConsumption, coalConsumption) {

    this.userKey = userId
    this.state = state
    this.windConsumption = windConsumption
    this.solarConsumption = solarConsumption
    this.gasConsumption = gasConsumption
    this.coalConsumption = coalConsumption

  }


}

/**
 * LocationstasController class - (frontend) - for rendering location-Stats page and handeling "post to leaderboard" functionality.
 */
export class LocationstasController {
  //all other functions get access to it and edit it
  static LocationId = ""
  static totalConsumption = 0

  static locationState = ""
  static production = []

  static record = {}


  static {


    // Get the location id from the query string
    //built in  JS webbrowser, pull apart querystring and url
    const urlParams = new URLSearchParams(window.location.search)//return query string
    this.locationId = urlParams.get("id")//return id from query string
    this.totalConsumption = urlParams.get("total")

    // Get the National Sources from Backend
    this.getNationalSourcesFromBackend().then(() => {
      this.renderLocations()
    })

    this.renderLocations()

    document.getElementById("post").addEventListener("click", (e) => {
      this.CheckIfRecordExist(this.locationId)

    })


    document.getElementById("leaderboard").addEventListener("click", (e) => {
      this.goToLeaderboard(this.locationId)
    })

  }


  //check if the leaderboard record exists update, if it is not exist create. 
  static CheckIfRecordExist(id) {
    fetch("/leaderboard/list/" + id)
      .then(response => response.json())
      .then(results => {

        if (results.length > 0) {
          this.updateInLeaderboard(id)
        }
        else {
          this.sendToLeaderBoard(id)
        }

      })

  }
  //get the National Sources from Backend
  static getNationalSourcesFromBackend() {
    return fetch("/national/list")
      .then(response => response.json())
      .then(results => {
        this.production = results
        console.log(this.production)

      })

  }

  //Render the stats page.
  static renderLocations() {
    const firstSection = document.getElementById("first")
    firstSection.innerHTML = ""
    const secondSection = document.getElementById("second")
    secondSection.innerHTML = ""
    let productionByState = {}
    const location = LocationModel.getByID(this.locationId)
    let result = this.production.filter(p => p.state == this.locationState)
    if (result.length > 0) {
      productionByState = result[0]
    }
    document.getElementById("location-name").innerText = "Location Name: " + location.name + " - " + location.state
    document.getElementById("title").innerText = "Energy Consumed by sources: " + this.totalConsumption + " WHS/day"

    this.locationState = location.state
    const windConsumption = this.totalConsumption * productionByState.windProportion / 100
    const solarConsumption = this.totalConsumption * productionByState.solarProportion / 100
    const gasConsumption = this.totalConsumption * productionByState.gasProportion / 100
    const coalConsumption = this.totalConsumption * productionByState.coalProportion / 100
    // console.log(windConsumption)
    // console.log(solarConsumption)
    // console.log(gasConsumption)
    // console.log(coalConsumption)

    // Bar-graph section
    firstSection.innerHTML =
      `<section class="energy-bar"><label for="wind">Wind:</label> <meter  value="${(windConsumption / this.totalConsumption)}"></meter></section>
    <section class="energy-bar"><label for="solar">Solar:</label><meter   value="${(solarConsumption / this.totalConsumption)}"></meter></section>
    <section class="energy-bar"><label for="gas">Gas:</label><meter  value="${(gasConsumption / this.totalConsumption)}"></meter></section>
    <section class="energy-bar"><label for="coal">Coal:</label><meter  value="${(coalConsumption / this.totalConsumption)}"></meter></section>`


    //Numerical section
    secondSection.innerHTML = `<section class="energy-value"><label for="wind">Wind:</label><span>${windConsumption} WHs/day</span></section>
         <section class="energy-value"><label for="solar">Solar:</label><span>${solarConsumption} WHs/day</span></section>
         <section class="energy-value"><label for="gas">Gas:</label><span>${gasConsumption}  WHs/day</span></section>
         <section class="energy-value"><label for="coal">Coal:</label><span>${coalConsumption} WHs/day</span></section>`

    let user = this.locationId
    let state = this.locationState

    this.record = new LeaderboardModel(user, state, windConsumption, solarConsumption, gasConsumption, coalConsumption)
    console.log(this.record)
  }



  static goToLeaderboard(id) {
    window.location = "/views/leaderboard.html?id=" + id
  }

  //update exisiting record in leaderboard
  static updateInLeaderboard(id) {
    fetch("http://localhost:8080/leaderboard/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(this.record)
    }).then(response => response.json())
      .then(result => {
        console.log("Response from post:" + result)
        window.location = "/views/leaderboard.html?id=" + id
      })
  }

  //create a new record in leaderboard
  static sendToLeaderBoard(id) {

    fetch("http://localhost:8080/leaderboard/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.record)
    }).then(response => response.json())
      .then(data => {
        console.log("Response from post:" + data)
        window.location = "/views/leaderboard.html?id=" + id
      })


  }


}