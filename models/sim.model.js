module.exports = function (mongoose) {
    let schema = mongoose.Schema({
        number: { type: String, required: true, index: { unique: true } },
        imsi: { type: String, required: false, default: 'not-set'  },
        imei: { type: String, required: false, default: 'not-set'  },
        provider: { type: String, required: false, default: 'not-set'  },
    }, { timestamps: true });

    schema.statics = {
        collectionName: 'sims',
        routeOptions: {}
    };

    return schema;
};