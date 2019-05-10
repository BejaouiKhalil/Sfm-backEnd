const rate = `
    type rate{
        id: ID!
        vote: Float!
        comment: String
        courseId: ID
        course: Course
        author: user
    }
    input RateInput{
        vote: Float
        comment: String
        courseId : ID
        author: ID
    }

    type Query{
        Moyrates(courseId: ID!) : Float
        rates(courseId: ID!) : [rate]
    }
    type Mutation{
        test:String
        addRate(input : RateInput!) : rate
        deleteRate(id : ID!) : rate
        updateRate(id: ID! , input : RateInput) : rate

    }
`;
module.exports = rate;
