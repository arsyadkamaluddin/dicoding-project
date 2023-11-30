const { nanoid } = require("nanoid");
let Data = [];
function allData() {
  return Data;
}
function cekId(bookId) {
  let hasil = Data.filter(function (e) {
    return e.id == bookId;
  });
  if (hasil.length == 1) {
    return true;
  }
  return false;
}
function validasiData(id, data) {
  if (cekId(id)) {
    let key = Object.keys(data);
    if (!key.includes("name")) {
      return "Gagal memperbarui buku. Mohon isi nama buku";
    } else if (data.readPage > data.pageCount) {
      return "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";
    }
    updateData(id, data);
    return "Berhasil";
  } else {
    return "Gagal memperbarui buku. Id tidak ditemukan";
  }
}
function updateData(bookId, data) {
  Data.forEach(function (e, i) {
    if (e.id == bookId) {
      Data[i] = {
        id: bookId,
        name: data.name,
        year: data.year,
        author: data.author,
        summary: data.summary,
        publisher: data.publisher,
        pageCount: data.pageCount,
        readPage: data.readPage,
        finished: data.readPage === data.pageCount,
        reading: data.reading,
        insertedAt: data.insertedAt,
        updatedAt: new Date().toISOString(),
      };
    }
  });
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
    finished: data.readPage === data.pageCount,
    reading: data.reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (data.readPage > data.pageCount) {
    return "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
  }
  if (data.name === "" || !data.name) {
    return "Gagal menambahkan buku. Mohon isi nama buku";
  }
  Data.push(newData);
  return "sukses";
}
function deleteData(bookId) {
  let hasil = 0;
  Data = Data.filter((e) => {
    if (e.id === bookId) {
      hasil++;
    }
    return e.id !== bookId;
  });
  if (hasil === 1) {
    return Data;
  } else {
    return "gagal";
  }
}
function searchBooks(method, val) {
  if (method === "id") {
    let hasil = Data.filter((e) => {
      return e.id === val;
    });
    return hasil.length === 0 ? "gaada" : hasil;
  } else if (method === "name") {
    let hasil = Data.filter((e) => {
      return e.name.toLowerCase().includes(val);
    });
    return hasil.length === 0 ? "gaada" : hasil;
  } else if (method === "finished") {
    if (val < 2) {
      let hasil = Data.filter((e) => {
        return e.finished === (val === 1) ? true : false;
      });
      return hasil;
    }
    return Data;
  } else if (method === "reading") {
    if (val < 2) {
      let hasil = Data.filter((e) => {
        return e.reading === (val === 1) ? true : false;
      });
      return hasil;
    }
    return Data;
  }
  return Data;
}

module.exports = {
  addData,
  deleteData,
  searchBooks,
  allData,
  validasiData,
};
