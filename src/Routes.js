const { addData, deleteData, searchBooks, allData } = require("./Functions");
module.exports = [
  {
    method: "GET",
    path: "/books",
    handler: (req, h) => {
      let hasil = 0;

      if (Object.keys(req.query).length > 0) {
        if ("finished" in req.query) {
          hasil =
            req.query.finished == 1
              ? searchBooks("finished", 1)
              : searchBooks("finished", 0);
        } else if ("reading" in req.query) {
          hasil =
            req.query.reading == 1
              ? searchBooks("reading", 1)
              : searchBooks("reading", 0);
        } else if ("nama" in req.query) {
          hasil = searchBooks("nama", req.query.nama);
        }
        if (hasil != "gaada") {
          return h
            .response({
              status: "success",
              data: {
                books: hasil,
              },
            })
            .code(200);
        }
      }

      return h
        .response({
          status: "success",
          data: {
            books: allData(),
          },
        })
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/books/{booksId}",

    handler: (req, h) => {
      let hasil = searchBooks("id", req.params.booksId);
      if (hasil == "gaada") {
        return h
          .response({
            status: "fail",
            message: "Buku tidak ditemukan",
          })
          .code(400)
          .message("Bad Request");
      }
      return h
        .response({
          status: "success",
          data: {
            books: hasil,
          },
        })
        .code(200);
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: (req, h) => {
      let panjang = allData().length;
      let response = addData(req.payload);
      if (response == "sukses") {
        return h
          .response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
              booksId: allData()[panjang].id,
            },
          })
          .code(201);
      } else {
        return h
          .response({
            status: "fail",
            message: response,
          })
          .code(400)
          .message("Bad Request");
      }
    },
  },
  {
    method: "DELETE",
    path: "/books/{booksid}",
    handler: (req, h) => {
      let data = deleteData(req.params.booksid);
      if (data != "gagal") {
        return h
          .response({
            status: "success",
            message: "Buku berhasil dihapus",
          })
          .code(200);
      }
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404)
        .message("Bad Request");
    },
  },
];
