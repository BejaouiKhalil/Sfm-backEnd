const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const rateSchema = Schema({
        //user 
        vote:{
            type:Number,
            required:true
        },
        course:{
            type:Schema.Types.ObjectId,
            ref: 'Course'
        }

});
const rate = mongoose.model('Rate',rateSchema);
module.exports =rate;