let Joi = require('@hapi/joi');
let RestHapi = require('rest-hapi');

module.exports = function (mongoose) {
    let modelName = 'sims';
    let Types = mongoose.Schema.Types;
    let schema = mongoose.Schema({
        number: { type: Types.String, required: true, index: { unique: true } },
        imsi: { type: Types.String, required: false, default: 'not-set'  },
        imei: { type: Types.String, required: false, default: 'not-set'  },
        blocked: { type: Types.Boolean, required: false, default: true  },
        provider: { type: Types.String, required: false, default: 'not-set'  },
    }, { timestamps: true });

    schema.statics = {
        collectionName: modelName,
        routeOptions: {
            extraEndpoints: [
                // Password Update Endpoint
                function (server, model, options, logger) {
                  const Log = logger.bind("AssignSim")
                  let Boom = require('@hapi/boom')
        
                  let collectionName = model.collectionDisplayName || model.modelName
        
                  Log.note("Getting and blocking sim from collection " + collectionName)
        
                  let handler = async function (request, h) {
                    try {
                      let result = await RestHapi.list(model, {blocked: request.params.blocked, $limit: 1}, Log)
                      if (result) {
                        return h.response(result).code(200)
                      }
                      else {
                        throw Boom.notFound("No resource was found with that id.")
                      }
                    } catch(err) {
                      if (!err.isBoom) {
                        Log.error(err)
                        throw Boom.badImplementation(err)
                      } else {
                        throw err
                      }
                    }
                  }
        
                  server.route({
                    method: 'GET',
                    path: '/sims/assignsim/{blocked}',
                    config: {
                      handler: handler,
                      auth: null,
                      description: 'Gets a sim and block it.',
                      tags: ['api', 'sims'],
                      validate: {
                        params: {
                            blocked: Joi.boolean().optional()
                          }
                      },
                      plugins: {
                        'hapi-swagger': {
                          responseMessages: [
                            {code: 200, message: 'Success'},
                            {code: 400, message: 'Bad Request'},
                            {code: 404, message: 'Not Found'},
                            {code: 500, message: 'Internal Server Error'}
                          ]
                        }
                      }
                    }
                  })
                }
              ]
        }
    };

    return schema;
};