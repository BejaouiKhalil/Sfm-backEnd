const course = require('./../../../models/Course.js');
const classe = require('../../../models/Class');
module.exports = {
    Query:{
        courses: () => course.find().populate('classe'),
        course: (_,{id}) => course.findById(id),
        findCoursesByClass: async (_,{class_id}) =>{ 
            const courses = await course.findOne({classeId : class_id});
            console.log(courses);
            return courses;
        },
        findCourseByName: async (_,{ name })=>{
            const obj = await course.findOne({name:name});
            console.log(obj);
            return obj;            
        }
    },
    Mutation:{
        addCourse : async (_,{input}) =>{
            //classe id 5c9a7b4d396405046030bcad
            let newcourse = new course({...input,classe:input.classeId});
            try {
                let res=await newcourse.save();
                let cls = await classe.findById(newcourse.classe);
                cls.courses.push(newcourse);
                await classe.findOneAndUpdate({_id:newcourse.classe},cls);

                return new course({...res, id: newcourse.id});
            } catch (error) {
               console.log(error);
               throw error; 
            }
        },
        updateCourse : async (_,input) =>{
            try {
                let res = await course.findByIdAndUpdate({_id:input.id},input.input);
                return res;
            } catch (error) {
                console.log(error);
                throw error;
            }
            
            
       },
       deleteCourse : async (_,{id}) =>{
            try {
                let res = await course.findOneAndDelete({_id:id});
                return res;
            } catch (error) {
                console.log(error);
                throw error;  
            }
       }

    }
}