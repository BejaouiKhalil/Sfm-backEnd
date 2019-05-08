
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var demandSchema = mongoose.Schema({
    date:{
        type: Date,
        required: false,
        default :Date.now()
    } ,
    result: {
        type: Boolean,
    },
    learner:{
        type: Schema.Types.ObjectId, ref: 'User' }
    ,
    quiz:{
        type: Schema.Types.ObjectId, ref: 'Quiz'}

});
module.exports  = mongoose.model('Demand',demandSchema);
