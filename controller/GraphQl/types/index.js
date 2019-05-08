const { mergeTypes } = require("merge-graphql-schemas");

const classe = require("./classTypes");
const course = require("./courseTypes");
const rate = require("./rateTypes");
const user = require("./UserType");

const subscribtion = `
type Subscription {
  courseAdded: Course
}`;

const typeDefs = [classe, course, rate, user, subscribtion];

module.exports = mergeTypes(typeDefs, { all: true });
