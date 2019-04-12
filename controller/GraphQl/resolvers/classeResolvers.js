const classe = require('../../../models/Class');
module.exports = {
    Query:{
    classes: () => classe.find().populate('courses'),
    class: (_,{id}) => classe.findById(id),
},
    Mutation:{
      
        createClass:(_,{input})=>{
            console.log("hi :"+ input.name);
            return classe.create({name:input.name,description:input.description});
        },
        updateClass: async (_,input)=>{
            try {
                let res = await classe.findByIdAndUpdate({_id:input.id},input.input);
                 return res;   
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        deleteClass: async (_,{id})=>{
            try{
                let res = await classe.findOneAndDelete({_id:id});
                return res;
            }catch(err){
                console.log(err);
                throw err;
            }
        }

    }
};