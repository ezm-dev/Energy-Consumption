/**
 * LeaderboardController class(frontend) - for rendering leaderboard page and handeling sorting and deleting functionality.
 */

export class LeaderboardController {


  static leaderboardList = []

  static locationKey = ""

  static sortOption = "highest solar"

  static {

    // Get the location id from the query string
    //built in  JS web browser, pull apart querystring and url
    //return query string
    const urlParams = new URLSearchParams(window.location.search)
    //return id from query string
    this.locationKey = urlParams.get("id")

    //load the data from backend
    this.loadRecordsFromBackend()
      .then(() => {
        this.renderLeaderboard()
      })

    //setup input event on the sort select
    document.getElementById("leaderboard-sort").addEventListener("input", (e) => {
      this.setSortOption(e.target.value)
      this.renderLeaderboard()
    })


  }

  /**
   * Get the leaderboard records from the backend using fetch.
   * @returns {[object]} - list of all leaderboar records from the backend.
   */
  //load leaderboard records from backend.
  static loadRecordsFromBackend() {
    return fetch("/leaderboard/list")
      .then(response => response.json())
      .then(results => {
        this.leaderboardList = results
      })
  }


  //set sort option
  static setSortOption(sortOption) {
    this.sortOption = sortOption
  }


  //sorting
  static getResults() {
    return this.leaderboardList.sort((a, b) => {
      if (this.sortOption == "highest solar") {
        return b.solarConsumption - a.solarConsumption;

      } else if (this.sortOption == "highest wind") {
        return b.windConsumption - a.windConsumption;
      }
    });

  }



  /**
   * Delete the leaderboard record by id using fetch. 
   * @param {number} id 
   */
  static deleteRecordById(id) {
    fetch("http://localhost:8080/leaderboard/delete/" + id, {
      method: "DELETE"
    }
    ).then(response => response.json())
      .then(results => {
        console.log("Response from post:" + results)
        window.location = "/views/leaderboard.html"
      })
  }


  /**
   * Rendering the leaderboard page
   */
  static renderLeaderboard() {
    let locationId = this.locationKey
    console.log(locationId)
    let SortedResults = this.getResults()
    //console.log(SortedResults)

    const list = document.getElementById("list")
    list.innerHTML = ""

    for (const result of SortedResults) {
      const row = document.createElement("tr")

      const state = document.createElement("td")
      state.innerText = result.state
      row.appendChild(state)

      const wind = document.createElement("td")
      wind.innerText = result.windConsumption
      row.appendChild(wind)

      const solar = document.createElement("td")
      solar.innerHTML = result.solarConsumption
      row.appendChild(solar)

      const gas = document.createElement("td")
      gas.innerText = result.gasConsumption
      row.appendChild(gas)

      const coal = document.createElement("td")
      coal.innerText = result.coalConsumption
      row.appendChild(coal)

      if (result.userKey == locationId) {
        const button = document.createElement("input")
        button.type = "button"
        button.value = "X"
        // button.className="item-button"
        button.className = "delete-btn"
        row.appendChild(button)
        button.addEventListener("click", () => {
          this.deleteRecordById(locationId)
        })

      }

      list.appendChild(row)

    }

  }

}


