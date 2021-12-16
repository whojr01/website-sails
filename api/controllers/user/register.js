
module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    fullname: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New user created'
    },

    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use.'
    },

    error: {
      description: 'Something went wrong',
      message: 'whatever',
      error: 'hmmmm',
    }
  },


  fn: async function (inputs,exits) {

    try {
      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');
      const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;

      let newUser = await User.create({
        fullname: inputs.fullname,
        email: newEmailAddress,
        password: inputs.password,
        emailProofToken: token,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTl
      }).fetch();

      const email = {
        to: newUser.email,
        subject: 'Confirm your account',
        template: 'confirm',
        context: {
          name: newUser.fullname,
          confirmLink: confirmLink,
        },
      };

    await sails.helpers.sendMail(email);

      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
      });

    } catch (error) {

      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occured',
          error: 'This email address already exists'
        })
      }
      return exits.error({
        message: 'Oops :) an error occured -- Really, Really...',
        error: error.message,
      });
    }

  }
};
