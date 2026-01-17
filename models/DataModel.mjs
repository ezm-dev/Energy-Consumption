
/**
 * DataModel class is an abstract class for CRUD operations.
 * [Other models inherit it to perform CRUD operations on their data]
 */
export class DataModel {
    static data = []

    /**
     * Set or intialise the data of the model.
     * @param {[object]} data - data that will be stored in the model.
     */
    static setDataSource(data) {
        this.data = data
    }


    /**
     * Insert a record of data | Error message if it fails.
     * @param {object} entry -  a record of data.
     * 
     */
    static insert(entry) {
        if (!this.data) {
            throw new Error("Data source not initialised.")
        }

        this.data.push(entry.clone())
    }

    /**
     * Select data from the model - select()- select all | select(filter) -select based on filter.
     * @param {function} filter - predicate function to filter the records, if no filter all records will be returned.
     * @returns - records that match the filter.
     */
    static select(filter) {

        if (!this.data) {
            throw new Error("Data source not initialised.")
        }

        if (typeof filter == "function") {
            return this.data.filter(filter).map(e => e.clone())
        } else {
            return this.data.map(e => e.clone())
        }
    }

    /**
     * update the data in the model.
     * @param {function} filter - predicate function to filter the existing record that will be updated.
     * @param {object} entry - the record the will update the existing record.
     * @returns {number} - the number of records that were updated.
     */
    static update(filter, entry) {
        if (!this.data) {
            throw new Error("Data source not initialised.")
        }

        if (typeof filter !== "function") {
            throw new Error("Filter must be a predicate function.")
        }

        let count = 0
        for (let index = 0; index < this.data.length; index++) {
            if (filter(this.data[index])) {
                this.data[index] = entry.clone()
                count++
            }
        }

        return count
    }

    /**
     * Delete data based on filter.
     * @param {function} filter - predicate function to filter the record that will be deleted.
     * @returns {number} - the number of records that were deleted.
     */
    static delete(filter) {
        if (!this.data) {
            throw new Error("Data source not initialised.")
        }

        if (typeof filter !== "function") {
            throw new Error("Filter must be a predicate function.")
        }

        const countBefore = this.data.length
        this.data = this.data.filter(entry => !filter(entry))
        return countBefore - this.data.length
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}
