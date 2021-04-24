const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql')
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/graphQL?safe=true', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
     console.log('connected to mongo db');
});

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(schema.SchemaQuery),
    rootValue:schema.resolver,
    graphiql: true
}));

app.listen(4000, () => { console.log('Now listening for requests on port 4000'); })