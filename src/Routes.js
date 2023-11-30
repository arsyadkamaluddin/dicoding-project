let Data = require("./Data");
let panjang = Data.length;
const { addData, deleteData, searchBooks } = require("./Functions");
module.exports = [
  // {
  //   method: "GET",
  //   path: "/",
  //   handler: (req, h) => {
  //     return "Halo";
  //   },
  // },
  {
    method: "GET",
    path: "/books",
    handler: (req, h) => {
      return {
        status: "success",
        data: {
          books: Data,
        },
      };
    },
  },
  {
    method: "GET",
    path: "/books/{booksId}",

    handler: (req, h) => {
      let hasil = searchBooks("id", req.params.booksId);
      return {
        status: "success",
        data: {
          books: hasil,
        },
      };
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: (req, h) => {
      let response = addData(req.payload);
      if (response == "sukses") {
        return {
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            booksId: Data[panjang].id,
          },
        };
      } else {
        return {
          status: "fail",
          message: response,
        };
      }
    },
  },
  {
    method: "DELETE",
    path: "/books/{booksid}",
    handler: (req, h) => {
      deleteData(req.params.booksid);
      return {
        status: "success",
        message: "Buku berhasil dihapus",
      };
    },
  },
];
