const user = require("../../../models/User");
const classe = require("../../../models/Class");
module.exports = {
  Query: {
    users: () => user.find(),
    user: async (_, { input }) => {
      try {
        console.log(input);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    findUserByName: async (_, { name }) => {
      return user.find({ name: { $regex: ".*" + name + ".*" } });
    }
  },
  Mutation: {
    subscribe: async (_, { user_id, class_id }) => {
      try {
        let subscriber = await user.findById(user_id);
        let cls = await classe.findById(class_id);

        if (cls.subscribers.indexOf(user_id) < 0) {
          cls.subscribers.push(user_id);
          const test = await classe.findOneAndUpdate({ _id: class_id }, cls);
        }
        if (subscriber.classes.indexOf(class_id) < 0) {
          subscriber.classes.push(class_id);
          subscriber = await user.findOneAndUpdate(
            { _id: user_id },
            subscriber
          );
        }
        return await user.findById(user_id);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    unfollow: async (_, input) => {
      try {
        console.log(input);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    notify: async (_, input) => {
      console.log("object");
      try {
        console.log(input);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
