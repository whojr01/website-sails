/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "users",

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

  
    fullname: {
      type: 'string',
      required: true,
      columnName: 'full_name'
    },
  
    email: {
      type: 'string',
      required: true,
      unique: true
    },
  
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
      columnName: 'email_status'
    },
  
    emailProofToken: {
      type: 'string',
      description: 'This will be used in the account verification email',
      columnName: 'email_proof_token'
    },
  
    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'time in milliseconds representing when the emailroofToken will expire',
      columnName: 'email_proof_token_expires_at'
    },
  
    password: {
      type: 'string',
      required: true
    },
  
    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identify when recovering a password',
      columnName: 'password_reset_token'
    },
  
    passwordResettokenExpiresAt: {
      type: 'number',
      description: 'A timestamp representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token',
      example: 1508944074211,
      columnName: 'password_reset_token_expires_at'
    },

    // Update the auto-created atributes
    createdAt: {
      type: 'number',
      autoCreatedAt: true,
      columnName: 'created_at'
    },

    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
      columnName: 'updated_at'
    }

    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  //
  // customToJSON:
  // Omit the password propert when converting instances of the User.js model.
  //
  customToJSON: function () {
    return _.omit(this, ["password"]);
  },

  // Waterline Life cycle hook
  // 
  beforeCreate: async function (values, proceed) {
    // Hash password
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
      return proceed();
  }
};

