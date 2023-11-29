const { nanoid } = require("nanoid");
let Data = require("./Data");
function addData(data) {
  data = {
    id: nanoid(16),
    name: data.name,
    year: data.year,
    author: data.author,
    summary: data.summary,
    publisher: data.publisher,
    pageCount: data.pageCount,
    readPage: data.readPage,
    finished: data.readPage == data.pageCount,
    reading: data.reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  Data.push(data);
}
function deleteData(bookId) {
  Data = Data.filter((e) => {
    return e.id != bookId;
  });
}

module.exports = { addData, deleteData };
