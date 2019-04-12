
const rate = `
    type rate{
        id: ID!
        vote: Int!
        courseId: ID
        course: Course
    }
    input RateInput{
        vote: Int
        courseId : ID
    }

    type Query{
        rates(courseId: ID!) : Float
    }
    type Mutation{
        addRate(input : RateInput!) : rate
        deleteRate(id : ID!) : rate
        updateRate(id: ID! , input : RateInput) : rate

    }
`
module.exports = rate;
