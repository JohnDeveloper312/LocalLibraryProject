function findAuthorById(authors, id) {
  let found = authors.find((authors)=> authors['id'] === id
  )
  return found
}

function findBookById(books, id) {
  let result = books.find((books)=> books['id']===id)
  return result
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc,book)=>{
    const [borrowed,returned] = acc //this creates the two arrays at the end through destructuring
    const recent = book.borrows[0]
    if (recent.returned){
      returned.push(book)
    }else{
      borrowed.push(book)
    }
    return acc 
  },[[],[]])
  
}

function getBorrowersForBook(book, accounts) {
  const accountsById = accounts.reduce((acc, account)=>{
    acc[account.id] = account;
    return acc;
  }, {});
  return book.borrows.map(({id, returned})=> ({
    ...accountsById[id], //grabbing all the info in accountsById variable
    returned,
  }))
  .slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
