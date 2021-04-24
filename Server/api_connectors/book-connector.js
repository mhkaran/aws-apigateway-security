const request = require('request-promise')

module.exports = {

fetchBookById : async (id) => {
    try{
        return JSON.parse(await request.get('http://localhost:4002/book/' + id))
     }
     catch(e)
     {
         throw e
     }
},

fetchBooks : async () =>{
    try{
        return JSON.parse(await request.get('http://localhost:4002/books/'))
     }
     catch(e)
     {
         throw e
     }
},

fetchBookByAuthorId: async (id)=> {

    try{
        return JSON.parse( await request.get('http://localhost:4002/book/author/' + id))
     }
     catch(e)
     {
         throw e
     }
}

}
