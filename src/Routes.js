const {
  addData,
  deleteData,
  searchBooks,
  allData,
  validasiData,
} = require("./Functions");

module.exports = [
  {
    method: "GET",
    path: "/books",
    handler: (req, h) => {
      let hasil = 0;

      if (Object.keys(req.query).length > 0) {
        if ("finished" in req.query) {
          hasil = searchBooks("finished", req.query.finished);
        } else if ("reading" in req.query) {
          hasil = searchBooks("reading", req.query.reading);
        } else if ("name" in req.query) {
          hasil = searchBooks("name", req.query.name.toLowerCase());
        }
        if (hasil !== "gaada") {
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
      const hasil = searchBooks("id", req.params.booksId);
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
      const panjang = allData().length;
      const response = addData(req.payload);
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
      }
      return h
        .response({
          status: "fail",
          message: response,
        })
        .code(400)
        .message("Bad Request");
    },
  },
  {
    method: "DELETE",
    path: "/books/{booksid}",
    handler: (req, h) => {
      const data = deleteData(req.params.booksid);
      if (data !== "gagal") {
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
  {
    method: "PUT",
    path: "/books/{booksId}",
    handler: (req, h) => {
      const hasil = validasiData(req.params.booksId, req.payload);
      if (hasil == "Berhasil") {
        return h
          .response({
            status: "success",
            message: "Buku berhasil diperbarui",
          })
          .code(200)
          .message("OK");
      } else if (hasil == "Gagal memperbarui buku. Id tidak ditemukan") {
        return h
          .response({
            status: "fail",
            message: hasil,
          })
          .code(404)
          .message("Bad Request");
      }
      return h
        .response({
          status: "fail",
          message: hasil,
        })
        .code(400)
        .message("Bad Request");
    },
  },
];
