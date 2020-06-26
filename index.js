
require('dotenv').config();

let Hapi = require('@hapi/hapi');
let mongoose = require('mongoose');
let RestHapi = require('rest-hapi');

async function api(){

    let port = process.env.SERVER_PORT || 8080;

    try {
        let server = Hapi.Server({ host: '0.0.0.0', port: port });

        let config = {
            appTitle: "Test API",
            mongo: {
                URI: process.env.MONGODB_URI
            },
            enableMongooseRunValidators: true,
            enableQueryValidation: true,
            enableResponseFail: false
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