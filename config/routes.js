/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // Gets the home page
    "GET /": "home/index",

    // sails generate action user/register
    // Post to Register User
    "POST /user/register": "user/register",

    // Confirm user email token
    // sails generate action user/confirm
    "GET /user/confirm": "user/confirm",

    // Login User
    // sails generate action user/login
    "POST /user/login": "user/login",

    // Forget Password
    // sails generate action user/forgot-password
    "POST /user/forgot-password": "user/forgot-password",

    // sails generate action user/reset-password
    "GET /user/reset-password": "user/reset-password",
};
