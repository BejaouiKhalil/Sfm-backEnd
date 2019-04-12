const classe = require('../../../models/Class');

const course = `
    type Course{
       id : ID!
       name: String
       type: String 
       contenu: String
       classeId: ID
       classe: class
       author: user
    }

    input inputCourse{
        name:String
        type:String
        contenu: String
        classeId: ID
    }

    type Query{
        courses:[Course]
        course(id:ID!):Course
        findCourseByName(name:String):Course
        findCoursesByClass(class_id:ID!):Course
    }
    type Mutation{
        addCourse(input : inputCourse!):Course
        updateCourse(id : ID!, input: inputCourse!): Course
        deleteCourse(id: ID!): Course 
    }
`
module.exports = course