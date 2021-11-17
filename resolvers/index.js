const dateScalar = require("../scalars");
const {gql} = require("apollo-server");
const {Hour} = require("../models/hours")


const resolvers = {
    Date: dateScalar,
    Query: {
        Hours: async (parent, args, context) => {
            return Hour.find(args);
        }
    },
    Mutation: {
        registerHour: async (parent, data, context) => {
            await Hour.create(data)
            return ` {user:${data.user}, start:${data.start}, end:${data.end}} created`
        },
        deleteHour: async (parent, data, context) => {
            await Hour.deleteOne(data)
            let d = {user: data.user}
            return await Hour.find(d)
        },
        updateHour: async (parent, data, context) => {
            await Hour.findOneAndUpdate(data.filter, data.arguments)
            let d = {user: data.user}
            return await Hour.find(d)
        }
    }
}


const typeDefs = gql`
    scalar Date

    type Hour {
        user: String
        start: Date
        end: Date
    }
    
    input HourArg {
        user: String
        start: Date
        end: Date
    }

    type Query {
        Hours (user: String, start: Date, end: Date): [Hour]
    }
    type Mutation {
        registerHour (user: String, start: Date, end: Date): String
        deleteHour (user: String, start: Date, end:Date): [Hour]
        updateHour (filter: HourArg, arguments: HourArg): [Hour]
    }
`
module.exports = {resolvers, typeDefs}