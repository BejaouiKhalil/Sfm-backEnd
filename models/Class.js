const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = Schema({
    name:{
        type: String,
        required : true
    },
    description:{
        type:String
    }
    ,
    createdAt:{
        type:Date,
        default: Date.now
    },
    lastupdate:{
        type:Date,
        default: Date.now
    },
    courses:[{
        type:Schema.Types.ObjectId,
        ref: 'Course'
    }],  
    subscribers:[{
        type:Schema.Types.ObjectId,
        ref: 'users'
    }],
})
const Classe = mongoose.model('Classe',ClassSchema);
module.exports = Classe;