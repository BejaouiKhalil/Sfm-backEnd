const rate = require('../../../models/Rate');
const course = require('../../../models/Course');
module.exports= {
    Query:{
        rates: async (_,{ courseId }) => {
        try {
            //"5c9b851aa699d02ed4b7abe9" id course
            let notes = await rate.find({course : courseId});
            console.log(notes);
            if (notes.length<=0){
            throw new Error('course does not exist');
            }
            let somme = 0;
            notes.forEach(n => {
                somme += n.vote;
            });
            const res = somme/notes.length;
            return res;
        } catch (err) {
            console.log(err);
            throw err;
        }
        },
       
    },
    Mutation:{
        addRate:  (_,{input}) => {       
            const newrate = new rate({
                    vote: input.vote,
                    course: input.courseId
                })
                let createdrate;
            return newrate.save()
            
        },
        deleteRate: async (_,{ id }) =>{
            res = await rate.findOneAndDelete({_id:id});
            return res;
        },
        updateRate:  (_,input) =>{
            console.log(input.id);
            rate.findById(input.id).then(res =>{
                console.log(res);
                return rate.findOneAndUpdate({_id:input.id},input.input);
            }).then( (res)=>{
                console.log("after update : ");
                return rate.findById(input.id);
            }).then(res =>{
                console.log(res);
                //resultat null mais ça marche 
                return {...res};
            }).catch(err =>{
                console.log(err);
                throw err;
            });
        }
    }
}   