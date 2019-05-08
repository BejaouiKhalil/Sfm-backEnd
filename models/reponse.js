
var mongoose = require('mongoose') , Schema = mongoose.Schema;

var reponseSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    question:{
        type: Schema.Types.ObjectId, ref: 'Question'
    },
    etat:{
        type: Boolean,
        required: true
    },
    score:{
        type: Number
    }

});
module.exports = mongoose.model('Reponse',reponseSchema);
