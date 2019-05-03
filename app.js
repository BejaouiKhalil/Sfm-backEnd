var chatContoller =require("./controller/chatController") ;
var  bodyParser =require( "body-parser");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var eventsRouter = require("./routes/events");
var userRouter = require("./routes/users");

const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { PubSub } = require("graphql-subscriptions");

var app = express();
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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var apis = require('./routes/users');
app.use('/user', apis);


app.use("/", indexRouter);

app.use("/events", eventsRouter);

const server = new ApolloServer(schema);
server.applyMiddleware({ app });
app.use (bodyParser.urlencoded ({extended: true  }));
app.use( bodyParser.json( { limit: '50MB' } ) );

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
var http = require('http');

var serverIO = http.createServer(app);

chatContoller.socketio(serverIO);

module.exports = app;
