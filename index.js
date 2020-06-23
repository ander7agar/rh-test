
require('dotenv').config();

let Hapi = require('@hapi/hapi');
let mongoose = require('mongoose');
let RestHapi = require('rest-hapi');

async function api(){

    let port = process.env.SERVER_PORT || 8080;

    try {
        let server = Hapi.Server({ port: port });

        let config = {
            appTitle: "My API",
            mongo: {
                URI: process.env.MONGODB_URI
            },
            enableMongooseRunValidators: true,
            enablePayloadValidation: true,
            enableResponseFail: true
        };

        await server.register({
            plugin: RestHapi,
            options: {
                mongoose,
                config
            }
        });

        await server.start();

        console.log("Server ready", server.info);

        return server
    } catch (err) {
        console.log("Error starting server:", err);
    }
}

module.exports = api();