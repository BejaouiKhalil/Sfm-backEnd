
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var quizSchema = mongoose.Schema({
    titre:{
        type: String,
        required: true
    } ,
    auteur:{
        type: Schema.Types.ObjectId, ref: 'User' },
    date_pub:{
        type: Date,
        required: false,
        default :Date.now()
    } ,
    description:{
        type: String,
        required: true },
    score:{
        type: Number,
        default: 0
    },
    matiere :{
        type: String
    },
    type: {type: String, enum: ['beginner','intermediate','advanced']},
    questions : [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    duration :{
        required: false,
        type : Number
    }
});
var Quiz = mongoose.model('Quiz',quizSchema);
module.exports = Quiz;