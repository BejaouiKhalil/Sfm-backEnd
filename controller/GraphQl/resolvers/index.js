const { merge } = require('lodash');

const classeResolvers = require('./classeResolvers');
const courseResolvers = require('./courseResolvers');
const rateResolvers = require('./rateResolvers');

const course = require('../../../models/Course');
const classe = require('../../../models/Class');
const user = require('./../../../models/User');

const relations = {
    rate:{
        course: (parent) => course.findById(parent.course)
    },
    Course:{
        classe: (parent) => classe.findById(parent.classe)
    },
    class:{
        courses: async (parent) => {console.log(parent.id   );
                return await course.find({classe:parent.id});
            },
        subscribers: async (parent) => user.find({user:parent.id})
    },
    user:{
        classes: async (parent) => await classe.find({classe:parent.id})
    }
}

const resolvers = merge(classeResolvers,courseResolvers,rateResolvers,relations);

module.exports = resolvers;