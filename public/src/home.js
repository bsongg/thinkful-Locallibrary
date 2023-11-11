// return the length of books array
function getTotalBooksCount(books) {
  return books.length
}
// return the length of accounts array
function getTotalAccountsCount(accounts) {
  return accounts.length
}
// return the total number of books borrowed
function getBooksBorrowedCount(books) {
  let total = 0
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++
    }
  })
  return total
}
// returns an array of the five most common occuring genres
function getMostCommonGenres(books) {
  const result = books.reduce((accum, book) => {
    const genre = book.genre
    const genreInfo = accum.find((element) => element.name === genre)
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      }
      accum.push(newGenreInfo)
    } else {
      genreInfo.count++
    }
    return accum
  }, [])
  result.sort((genreA, genreB) => genreB.count - genreA.count)
  result.splice(5)
  return result
}

function getMostPopularBooks(books) {
  const popularBooks = []
  const borrows = books.reduce((account, book) => {
    popularBooks.push({name: book.title, count: book.borrows.length})
  })
  popularBooks.sort((titleA, titleB) => titleB.count - titleA.count)
  popularBooks.splice(5)
  return popularBooks  
}

function getMostPopularAuthors(books, authors) {
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    }
    return newAuthorInfo
  })
  result.sort((authorA, authorB) => authorB.count - authorA.count)
  result.splice(5)
  return result
}

const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
