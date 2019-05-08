
var mongoose = require('mongoose') , Schema = mongoose.Schema;
var Reponse = require('../models/reponse');
var questionSchema = mongoose.Schema({

    description:{
        type: String,
        required: true
    },
    type : String,
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' } ,
    reponses : [{ type: Schema.Types.ObjectId, ref: 'Reponse' }]
});
module.exports = mongoose.model('Question',questionSchema);
