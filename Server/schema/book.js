const book = require('../api_connectors/book-connector');
const author = require('../api_connectors/author-connector.js');

const type = 
`type Book {
    _id: ID,
    name: String,
    genre: String
    author: Author
}
`

const query =
`   books: [Book]
    book(id: ID!): Book
`
const resolver = {
books: async ()=>{
    
    let books =  (await book.fetchBooks()).map( async book=> {
        return {
        ...book,
        author: await author.fetchAuthorById(book.authorId)
    }
})
return await Promise.all(books);

},
book: async (agrs)=>{
     
    let bookData = await book.fetchBookById(agrs.id)
    bookData.author =  await author.fetchAuthorById(bookData.authorId)
    return bookData;
}
}

module.exports = {type,query,resolver}