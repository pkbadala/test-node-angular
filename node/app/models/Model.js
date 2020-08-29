/****************************
 COMMON MODEL
 ****************************/
let _ = require("lodash");

class Model {

    constructor(collection) {
        this.collection = collection;
    }

    // Find all data
    find(filter = {}, project = {}, paginate = {}) {

        return new Promise((resolve, reject) => {

            this.collection.find(filter, project).exec((err, data) => {

                if (err) { return reject({ message: err, status: 0 }); }

                return resolve(data);
            });

        });

    }

    // Find single data
    findOne(filter = {}, project = {}) {

        return new Promise((resolve, reject) => {

            this.collection.find(filter, project).exec((err, data) => {

                if (err) { return reject({ message: err, status: 0 }); }

                return resolve(data);
            });

        });
    }

    // Update Data
    update(filter, data) {
        console.log('filter', filter)
        console.log('data', data)
        return new Promise((resolve, reject) => {
            console.log('in the promises');

            this.collection.findOneAndUpdate(filter, { $set: data }, { upsert: true, new: true }, (err, data) => {
                
                if (err) {
                    console.log("in the if block err of authentication");
                    console.log('err in authentication is : ', err)
                    return reject({ message: err, status: 0 });
                }

                return resolve(data);

            });

        });

    }

    // Store Data
    store(data, options = {}) {

        // console.log("data", data)

        return new Promise((resolve, reject) => {

            const collectionObject = new this.collection(data)
            // console.log("Collection Object", collectionObject);

            collectionObject.save((err, createdObject) => {
                // console.log("error is : ", err);
                // console.log("createdObject data in store() is : ", createdObject)
                if (err) {
                    console.log("In the err block in store() in model.js");
                    return reject({ message: err, status: 0 });
                }
                // console.log('after err ',createdObject);
                return resolve(createdObject);
            });

        });
    }

    // Delete Data
    destroy(filter) {

        return new Promise((resolve, reject) => {

            this.collection.remove(filter).exec((err, data) => {

                if (err) { return reject({ message: err, status: 0 }); }

                return resolve(data);
            });

        });
    }

    // Setting the Sort Params
    stages(params) {

        let stages = [];

        if (typeof params.sortBy !== 'undefined'
            && params.sortBy !== ''
            && typeof params.order !== 'undefined'
            && params.order !== ''
        ) {
            let sort = {};
            sort[params.sortBy] = (params.order === 'asc') ? 1 : -1;
            stages.push({ $sort: sort });
        }

        return stages;
    }

    // Aggregration
    aggregate(stages, query) {
        console.log("stages ::: ",stages)
        return new Promise(async (resolve, reject) => {

            let aggregationStages = _.clone(stages);

            aggregationStages = aggregationStages.concat(this.stages(query));

            try {
                const data = await this.collection.aggregate(aggregationStages);

                let result = { data };
                return resolve(result);

            } catch (err) {
                console.log("Aggregration error", err);
                return reject({ message: err, status: 0 });
            }

        });
    }

    pagination(filter, page, sort = {}, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!sort) {
                    sort = { createdAt: -1 }
                }
                let skip = limit * (page - 1)
                this.collection.find(filter).sort(sort).skip(skip).limit(limit).exec((err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(data);
                });
            } catch (error) {
                console.log("pagination error = ", error);
                return reject({ message: error, status: 0 });
            }
        });
    }

    count(filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collection.count((err, count) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(count);
                });
            }
            catch (error) {
                console.log("count error = ", error);
                return reject({ message: error, status: 0 });
            }

        });

    }

    incrementValue(filter) {

        return new Promise((resolve, reject) => {

            this.collection.findOneAndUpdate(filter, { $inc: { badge: 1 } }, { new: true }, (err, data) => {

                if (err) { return reject({ message: err, status: 0 }); }

                return resolve(data);

            });

        });

    }

    bulkInsert(data) {

        return new Promise((resolve, reject) => {
            this.collection.collection.insert(data, (err, data) => {
                if (err) {
                    reject("Find duplicate Users");
                }
                if (!err) {
                    resolve(err);
                }
            });
        });
    }

    newUpdate(filter, data) {
        return new Promise((resolve, reject) => {
            this.collection.collection.update(filter, data, { multi: true }, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (!err) {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = Model;

