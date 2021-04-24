const request = require('request-promise')
const book = require('../api_connectors/book-connector.js');

async function fetchAuthorById(id) {
    try{
        return  JSON.parse(await request.get('http://localhost:4001/author/'+id))
     }
     catch(e)
     {
         throw e
     }
 }
async function  fetchAuthors() {
    try{
        return  JSON.parse(await request.get('http://localhost:4001/authors/'));
    }
    catch(e)
    {
        console.log('auther - ' + e)
        throw e
    }
}
module.exports = { fetchAuthorById, fetchAuthors }
