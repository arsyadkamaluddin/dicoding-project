const { nanoid } = require("nanoid");
let Data = require("./Data");
function addData(data) {
  newData = {
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
  if (data.readPage > data.pageCount) {
    return "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
  }
  if (data.name == "" || !data.name) {
    return "Gagal menambahkan buku. Mohon isi nama buku";
  }
  Data.push(newData);
  return "sukses";
}
function deleteData(bookId) {
  Data = Data.filter((e) => {
    return e.id != bookId;
  });
}
function searchBooks(method, val) {
  if (method == "id") {
    let hasil = Data.filter((e) => {
      return e.id == val;
    });
    return hasil;
  }
}

module.exports = { addData, deleteData, searchBooks };
