const author = require('../api_connectors/author-connector.js');
const book = require('../api_connectors/book-connector.js');

const type =
`type Author {
     _id: ID,
    name: String,
    age:  Int,
    books:[Book]

}`


const query =
`   authors: [Author]
    author(id: ID!): Author
`

const resolver = {
    authors: async ()=>{
         
        let authors = (await author.fetchAuthors()).map( async auther=> {
                    return {
                    ...auther,
                    books: await book.fetchBookByAuthorId(auther._id)
                }
            })
        return await Promise.all(authors);
    },
    author: async (agrs)=>{
        let authorData = await author.fetchAuthorById(agrs.id)
        authorData.books = await book.fetchBookByAuthorId(authorData._id);
        return authorData;
    }
}

module.exports = {type,query,resolver}