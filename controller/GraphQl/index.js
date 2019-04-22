const typeDefs = require("./types/index.js");
const resolvers = require("./resolvers/index");

const schema = {
  typeDefs,
  resolvers
};

module.exports = schema;
