let booksFile = require("./books");

function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.map((account)=> accounts.id).length;
}

function getBooksBorrowedCount(books) {
  const bookByStatus = booksFile.partitionBooksByBorrowedStatus(books);
  const booksOut = bookByStatus[0];
  return booksOut.length
  
}
function _sortObjValues(obj){
  const keys = Object.keys(obj);
  return keys.sort((keyA,keyB)=> {
    if (obj[keyA]>obj[keyB]){
      return -1;
    }else if (obj[keyB]>obj[keyA]){
      return 1;
    } else {
      return 0;
    }
  }); 
}

function getMostCommonGenres(books) {
  const genres = books.reduce((acc,book)=> {
   if(!acc[book.genre]){
     acc[book.genre]= 1;
   }else{
     acc[book.genre]= acc[book.genre]+1;
   }
  return acc;
  },{})

  return Object.keys(genres)
    .reduce((acc, genre) => {
      acc.push({ 
        name: genre,
        count: genres[genre]
      })
      return acc
    }, [])
    .sort((a, b) => a.count < b.count ? 1 : -1)
    .slice(0, 5)

}

function getMostPopularBooks(books) {
  return books.reduce((acc,book)=> {
  acc.push({name:book.title, count: book.borrows.length})
  return acc
},[])
.sort((book1,book2)=>book1.count<book2.count? 1: -1)
.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
 const count = books.reduce((acc,{authorId,borrows})=>{
   if(acc[authorId]){
     acc[authorId].push(borrows.length);
   }else{
     acc[authorId] = [borrows.length];
   }
   return acc;
 },{});

 for(let id in count){
   const sum = count[id].reduce((a,b)=> a +b);
   count[id] = sum;
 }
 const sorted = _sortObjValues(count);
 return sorted
 .map((authorId)=>{
   const{
     name:{first,last},
   } = authors.find(({id})=> id === Number(authorId));
   const name = `${first} ${last}`;
   return {name, count: count[authorId]};
 })
  .slice(0,5); 
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
