const jwt = require("jsonwebtoken");

module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {
    subject: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject,        // Subject
      iss: "Logrocket Sails API"  // issuer
    };

    const secret = sails.config.local.jwtSecret || process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    return token;

  }


};

