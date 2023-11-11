const { findAccountById } = require("./accounts")

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((book) => !book.borrows[0].returned)
  const returned = books.filter((book) => book.borrows[0].returned)
  return [checkedOut, returned]
}

function getBorrowersForBook(book, accounts) {
  const checkOut = book.borrows
  const result = checkOut.map((check) => {
    const accountInfo = findAccountById(accounts, check.id)
    const newCheckOut = {
      ...check,
      ...accountInfo,
    }
    return newCheckOut
  })
  result.splice(10)
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
