const user=`
    type user{
        id:ID
        name:String
        email:String
        password:String
        classes:[class]
    }

    input userInput{
        name:String
        email:String
        password:String
    }
    type Query{
        users:[user]
        user(id : ID!):user
        findUserByName(name : String): user
    }
    type Mutation{
        subscribe(user_id: ID! , class_id: ID!): user
        unfollow(user_id: ID!, class_id: ID!):user
        notify(user_id: ID! , notification: String):user
    }

`

module.exports = user;