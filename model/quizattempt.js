
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var attemptSchema = mongoose.Schema({
    date:{
        type: Date,
        required: false,
        default :Date.now()
    } ,
   report : {
     type : String,
     required: false
   },
    score:{
        type: Number,
        default: 0
    },
    result: {
        type: String,
    },
    attemptnum:{
        type : Number
    },
    learner:{
        type: Schema.Types.ObjectId, ref: 'User' }
    ,
    quiz:{
        type: Schema.Types.ObjectId, ref: 'Quiz'}

});
module.exports  = mongoose.model('Attempt',attemptSchema);
