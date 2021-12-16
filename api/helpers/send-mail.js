const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');
const hbs = require("nodemailer-express-handlebars");
const { form } = require("request/node_modules/form-data");


module.exports = {


  friendlyName: 'Send mail',


  description: 'Sends mail through nodemailer smtp service',


  inputs: {
    options: {
      type: "ref",
      required: true,
      debug: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

    error: {
      message: 'Something went wrong... go figura....',
    }

  },


  fn: function (inputs, exits) {

    var mailkey=sails.config.mailkey;
    const transporter = nodemailer.createTransport (
        nodemailerSendgrid(
        {
          apiKey: sails.config.local.sendGridAPIkey,
          // apiKey: mailkey.key,
          pool: false,
          debug: true,
          logger: true,
          transactionLog: true,
        }
        ),
      );

    transporter.use (
      "compile",
      hbs({
        viewEngine: {
          extName: ".hbs",
          partialsDir: "./views",
          layoutsDir: "./views",
          defaultLayout: "",
        },
        viewPath: "./views/",
        extName: ".hbs",
      })
    );

    try {
      let emailOptions = {
        from: "Rockem Sockem Go Bots <contact@whojr.com>",
        ...inputs.options
      };

      transporter.sendMail(emailOptions  , (err, res) => {
        if (err) {
          exits.error({ message: 'Error email not sent.'});
        }
        exits.success({message: 'Sent email successfully.'});
      });

    } catch (error) {
      exits.error({message: error.message });
      sails.log(error);
    }
  }
};

