const path = require("path");

const _entities = [ "./book", "./author" ]; //add more file as new entity schema file added in project

let GraphQLSchemaQuery = {type:"",query:"",resolver:{}};

//combine all the schemas, queries and resolvers 
(function() {
    var entities = {};
    _entities.forEach(x => 
        { 
            entities[path.basename(x, ".js")] = require(x)
            GraphQLSchemaQuery.type +=  entities[path.basename(x, ".js")].type
            GraphQLSchemaQuery.query += entities[path.basename(x, ".js")].query

            Object.keys(entities[path.basename(x, ".js")].resolver).forEach(function(key) {
                GraphQLSchemaQuery.resolver[key] = entities[path.basename(x, ".js")].resolver[key];
              });
        });
})();


 schemaObj = {
    SchemaQuery : `
                ${GraphQLSchemaQuery.type}
                type Query {
                ${GraphQLSchemaQuery.query}
                }
            `,
    resolver: GraphQLSchemaQuery.resolver
}

module.exports = schemaObj