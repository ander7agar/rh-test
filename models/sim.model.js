module.exports = function (mongoose) {
    let Types = mongoose.Schema.Types;

    let schema = mongoose.Schema({
        number: { type: Types.String, required: true, index: { unique: true } },
        retry: { type: Types.Number, required: true, default: 0 },
        imsi: { type: Types.String, required: false, default: 'not-set'  },
        imei: { type: Types.String, required: false, default: 'not-set'  },
        provider: { type: Types.String, required: false, default: 'not-set'  },
    }, { timestamps: true });

    schema.statics = {
        collectionName: 'sims',
        routeOptions: {}
    };

    return schema;
};