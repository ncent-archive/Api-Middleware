const nodemailer = require("nodemailer");
const aws = require("aws-sdk");
const htmlTemplate = require("./emailTemplates.js");

module.exports = {
    sendOTP(to, token) {
        aws.config.loadFromPath(`${__dirname}/awsConfig.json`);

        let transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01"
            })
        });

        const mailOptions = {
            from: "noreply@ncnt.io",
            to: to,
            subject: `Sign In Code: ${token}`,
            html: htmlTemplate.confirmationCodeHtml(token)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message %s sent: %s", info.messageId, info.response);
            }
            transporter.close();
        });
    },
    sendRefferalLinkEmail(to, shortUrl) {
        aws.config.loadFromPath(`${__dirname}/awsConfig.json`);

        let transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01"
            })
        });

        const mailOptions = {
            from: "noreply@ncnt.io",
            to: to,
            subject: `Refferal Link: ${shortUrl}`,
            html: htmlTemplate.confirmationCodeHtml(shortUrl)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message %s sent: %s", info.messageId, info.response);
            }
            transporter.close();
        });
    }
};
