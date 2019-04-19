//require models
const JobApplication = require('../models').JobApplication;
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = 'CHN7ASFU0';

module.exports = {
  async sendJobApplication(req, res) {
    console.log("\n\n\njobApplicationsController, sendJobApplications", req.body);
    try {
        console.log("creating job application");
        let newJobApplication = await JobApplication.create(req.body);
        console.log("\njobApplicationsController, new db jobApplication", newJobApplication.dataValues);

        let slackMessage = "";
        slackMessage += "Role: " + newJobApplication.dataValues.title + "\n";
        slackMessage += "First Name: " + newJobApplication.dataValues.firstName + "\n";
        slackMessage += "Last Name: " + newJobApplication.dataValues.lastName + "\n";
        slackMessage += "Email: " + newJobApplication.dataValues.email + "\n";
        slackMessage += "Resume: " + newJobApplication.dataValues.resumeURL + "\n";
        if(newJobApplication.dataValues.phone) {
            slackMessage += "Phone Number: " + newJobApplication.dataValues.phone + "\n";
        }
        if(newJobApplication.dataValues.coverLetterURL) {
            slackMessage += "Cover Letter: " + newJobApplication.dataValues.coverLetterURL + "\n";
        }
        if(newJobApplication.dataValues.githubURL) {
            slackMessage += "Github: " + newJobApplication.dataValues.githubURL + "\n";
        }
        if(newJobApplication.dataValues.githubURL) {
            slackMessage += "Linked In: " + newJobApplication.dataValues.linkedinURL + "\n";
        }
        if(newJobApplication.dataValues.referralCode) {
            slackMessage += "Refferal Code: " + newJobApplication.dataValues.referralCode + "\n";
        }

        try {
            const slackResponse = await web.chat.postMessage({ channel: conversationId, text: slackMessage });
            console.log('Message sent: ', slackResponse.ts);
        } catch(error) {
            console.log("There was a slack error: ", error);
        }
        

        // `res` contains information about the posted message
        
        return res.status(200).send(newJobApplication);
    } catch(e) {
        console.log("failed to create job application: ", e);
        return res.status(500).send({ invalidJobApplication: true, errors: e.errors });
    }
  }
}