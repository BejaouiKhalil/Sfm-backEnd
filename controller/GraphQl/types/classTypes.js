const classe = `
    type class{
        id: ID!
        name: String!
        description:String
        createdAt:String
        imageUrl: String
        lastupdate:String
        courses:[Course]
        subscribers:[user]
    }

    input InputClass{
        name:String
        description:String
        imageUrl: String
    }
    type Query {
        classes: [class]
        class(id:ID!): class   
    }
    type Mutation{
        createClass(input: InputClass!): class
        updateClass(id: ID!, input: InputClass!): class
        deleteClass(id: ID!): class
    }
    `;
module.exports = classe;
