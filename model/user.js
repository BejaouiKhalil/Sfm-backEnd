
var mongoose = require('mongoose') , Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
      },
    name : String,
    email : String
});

module.exports = mongoose.model('User',userSchema);