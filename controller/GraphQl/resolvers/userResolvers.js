const user = require('../../../models/User');
module.exports ={
    Query:{
        users:()=> user.find(),
        user: async (_,{input})=>{
            try {
                console.log(input);
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        findUserByName: async (_,{input})=>{
            try {
                console.log(input);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutations:{
        subscribe: async (_,input)=>{
            try {
                console.log(input);
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        unfollow: async(_,input)=>{
            try {
                console.log(input);
                
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        notify: async(_,input)=>{
            try {
                console.log(input);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}