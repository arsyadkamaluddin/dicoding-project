let Data = require("./Data");
let panjang = Data.length;
const { addData, deleteData } = require("./Functions");
module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Halo";
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: (req, h) => {
      //   h.status(404);
      return {
        status: "success",
        data: {
          books: Data,
        },
      };
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: (req, h) => {
      addData(req.payload);
      return {
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          booksId: Data[panjang].id,
        },
      };
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
