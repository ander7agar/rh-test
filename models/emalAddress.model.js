
module.exports = function (mongoose) {
    let Types = mongoose.Schema.Types;

    let schema = mongoose.Schema({
        address: { type: Types.String },
    });

    schema.statics = {
        collectionName: 'emailaddresses',
        routeOptions: {}
    };

    return schema;
};