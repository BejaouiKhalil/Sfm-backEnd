const course = require("./../../../models/Course.js");
const classe = require("../../../models/Class");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();
const NEW_COURSE = "NEW_COURSE";

module.exports = {
  Subscription: {
    courseAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([NEW_COURSE])
    }
  },
  Query: {
    courses: () => course.find().populate("classe"),
    course: (_, { id }) => course.findById(id),
    findCoursesByClass: async (_, { class_id }) => {
      const courses = await course.findOne({ classeId: class_id });
      console.log(courses);
      return courses;
    },
    findCourseByName: (_, { name }) => {
      return course.find({ name: { $regex: ".*" + name + ".*" } });
    }
  },
  Mutation: {
    addCourse: async (_, { input }) => {
      //classe id 5c9a7b4d396405046030bcad
      let newcourse = new course({ ...input, classe: input.classeId });
      try {
        let res = await newcourse.save();
        pubsub.publish(NEW_COURSE, { courseAdded: newcourse });
        let cls = await classe.findById(newcourse.classe);
        cls.courses.push(newcourse);
        await classe.findOneAndUpdate({ _id: newcourse.classe }, cls);

        return new course({
          ...newcourse,
          type: newcourse.type,
          name: newcourse.name,
          id: newcourse.id
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateCourse: async (_, input) => {
      try {
        let res = await course.findByIdAndUpdate(
          { _id: input.id },
          input.input
        );
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteCourse: async (_, { id }) => {
      try {
        let res = await course.findOneAndDelete({ _id: id });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
