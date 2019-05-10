const { merge } = require("lodash");

const classeResolvers = require("./classeResolvers");
const courseResolvers = require("./courseResolvers");
const rateResolvers = require("./rateResolvers");
const userResolvers = require("./userResolvers");

const course = require("../../../models/Course");
const classe = require("../../../models/Class");
const user = require("./../../../models/User");

//relation between models
const relations = {
  rate: {
    course: parent => course.findById(parent.course),
    author: parent => user.findById(parent.author)
  },
  Course: {
    classe: parent => classe.findById(parent.classe),
    author: parent => user.findById(parent.author)
  },
  class: {
    courses: async parent => {
      return await course.find({ classe: parent.id });
    },
    subscribers: async parent => await user.find({ classes: parent.id })
  },
  user: {
    classes: async parent => await classe.find({ subscribers: parent.id })
  }
};

const resolvers = merge(
  classeResolvers,
  courseResolvers,
  rateResolvers,
  userResolvers,
  relations
);

module.exports = resolvers;
