const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");

//MongoDb
const db = "mongodb://127.0.0.1:27017/sfm";
//GrahphQL schema
const schema = require("./controller/GraphQl/index.js");
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new ApolloServer(schema);

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 subscription Server ready at ${subscriptionsUrl}`);
});
