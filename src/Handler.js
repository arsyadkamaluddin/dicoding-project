const { nanoid } = require("nanoid");
let Data = [];
function allData() {
  return Data;
}

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
  let hasil = 0;
  Data = Data.filter((e) => {
    if (e.id == bookId) {
      hasil++;
    }
    return e.id != bookId;
  });
  console.log(Data);
  if (hasil == 1) {
    return Data;
  } else {
    return "gagal";
  }
}
function searchBooks(method, val) {
  if (method == "id") {
    let hasil = Data.filter((e) => {
      return e.id == val;
    });
    return hasil.length == 0 ? "gaada" : hasil;
  } else if (method == "name") {
    let hasil = Data.filter((e) => {
      return e.id == val;
    });
    return hasil.length == 0 ? "gaada" : hasil;
  } else if (method == "finished") {
    let hasil = Data.filter((e) => {
      let stat = val == 0 ? false : true;
      return e.finished == stat;
    });
    if (hasil.length > 0) {
      return hasil;
    }
  } else if (method == "reading") {
    if (val < 2) {
      let hasil = Data.filter((e) => {
        return e.reading == (val == 1) ? true : false;
      });
      return hasil;
    }
    return Data;
  }
  return Data;
}

module.exports = { addData, deleteData, searchBooks, allData };
