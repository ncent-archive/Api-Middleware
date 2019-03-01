//require models
const JobApplication = require('../models').JobApplication;

module.exports = {
  async sendJobApplication(req, res) {
    console.log("\n\n\njobApplicationsController, sendJobApplications", req.body);
    let newJobApplication = await JobApplication.create(req.body);
    console.log("\njobApplicationsController, new db jobApplication", newJobApplication.dataValues);
    res.status(200).send(newJobApplication);
  }
}