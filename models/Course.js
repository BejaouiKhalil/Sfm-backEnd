const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = Schema({
    name:{
        type: String,
        required : true
    },
    desciption:{
        type:String,
    },
    type:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    content:{
        type:Array
    },
    classe:{
        type:Schema.Types.ObjectId,
        ref: 'Classe'
    },
    rates:[{
        type:Schema.Types.ObjectId,
        ref: 'Rate'
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    }
});
CourseSchema.set('toObject',{virtuals: true});
const course = mongoose.model('Course',CourseSchema);
module.exports = course;