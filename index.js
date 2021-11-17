const {ApolloServer} = require('apollo-server')
const {resolvers, typeDefs} = require('./resolvers')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hours')
    .then()


const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log('Running here:', url)
})