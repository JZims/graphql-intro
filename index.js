const { ApolloServer, gql, MockList} = require("apollo-server")



const typeDefs = gql`

    scalar Date

    """
    An Object that describes the characteristics of a ski day
    """
    type SkiDay {
        id: ID!
        date: Date
        mountain: String!
        conditions: Conditions
    }

    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
    }

    type Query {
        totalDays: Int!
        allDays:[SkiDay!]
    }

    input AddDayInput {
        date: String!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!): SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

const mocks = {
    Date: () => "1/2/2025",
    String: () => "Suh dude?",
    // Query: () => ({
    //     allDays: () => (new MockList(8))
    // })
}

// const resolvers = {

// }

const server = new ApolloServer({
        typeDefs,
        mocks
    })

server.listen().then(({url}) => 
console.log(`Server running at ${url} `)
)