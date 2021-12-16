module.exports = {


  friendlyName: 'Confirm',


  description: 'Confirm user.',


  inputs: {
    token: {
      type: 'string',
      description: "The confirmation token from the email.",
      example: "3-038575jalei"
    }
  },


  exits: {
    success: {
      description: "Email address confirmed and requesting user logged in."
    },

    invalidOrExpiredToken: {
      statusCode: 400,
      description: "The provided token is expired, invalid, or already used."
    },
  },


  fn: async function (inputs, exits) {

    if (!inputs.token) {
      return exits.invalidOrExpiredToken({
        error: "The provided token is expired, invalid, or already used."
      });
    }

    var user = await User.findOne({ emailProofToken: inputs.token });

    if (! user || user.emailProofTokenExpiresAt <= Date.now()) {
      return exits.invalidOrExpiredToken({
        error: "The provided token is expired, invalid, or already used."
      });
    }

    if (user.emailStatus === "unconfirmed") {
      await User.updateOne({ id: user.id }).set({
        emailStatus: "confirmed",
        emailProofToken: "",
        emailProofTokenExpiresAt: 0
      });

      return exits.success({
        message: "Your account has been confirmed."
      });
    }

    return exits.invalidOrExpiredToken({
      error: "The provided token is expired, invalid, or already used."
    });

  }
};
