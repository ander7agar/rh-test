
module.exports = function (mongoose) {
    let schema = mongoose.Schema({
        address: { type: String },
    });

    schema.statics = {
        collectionName: 'emailaddresses',
        routeOptions: {}
    };

    return schema;
};