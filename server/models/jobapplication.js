'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define('JobApplication', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resumeURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coverLetterURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    githubURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedinURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  JobApplication.associate = function (models) {
    // associations can be defined here
  };
  return JobApplication;
};