
var mongoose = require('mongoose') , Schema = mongoose.Schema;

var gameplaySchema = mongoose.Schema({

    score:{
        type: Number  },
    user:{
        type: Schema.Types.ObjectId, ref: 'User' },
    game:{
        type : String   },

});
module.exports = mongoose.model('Game',gameplaySchema);
