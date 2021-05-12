function findAccountById(accounts, id) {
  let result = accounts.find((account)=> account['id'] === id
  )
  return result
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA,accountB)=> accountA.name.last.toLowerCase()>accountB.name.last.toLowerCase()? 1:-1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  return results = books.reduce ((acc,book)=> {
    const countPerBook = book.borrows.reduce((accBorrow, borrow)=>{
      return borrow.id === account.id ? accBorrow + 1 : accBorrow
    },0)
    return acc + countPerBook
  },0)
}


function getBooksPossessedByAccount(account, books, authors) {
  const getBooksBorrowing = books.filter((book)=> {
    const writer = authors.find((author)=>author.id===book.authorId);
    book["author"]=writer;
    return book.borrows.some(borrow=>borrow.id==account.id&&borrow.returned==false)
  })
  return getBooksBorrowing
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
