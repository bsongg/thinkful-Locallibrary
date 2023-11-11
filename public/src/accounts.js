function findAccountById(accounts, id) {
  let foundId = accounts.find((account) => account.id === id)
  return foundId
}

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1)
return sorted
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account
  let total = 0

  for (let book in books) {
    const {borrows} = books[book]
    borrows.forEach((borrow) => {
      if (borrow.id === id) {
        total++
      }
    });
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = []
  books.map((book) => {
    book.borrows.map((borrow) => {
    authors.map((author) => {
      if(author.id === book.authorId) book["author"] = author
    })
    if(borrow.returned === false && borrow.id === account.id) {
      result.push(book)
    }
    })
  })
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
