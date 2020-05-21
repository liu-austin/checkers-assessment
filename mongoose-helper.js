// jshint esversion:6
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/checkers-assessment", { useUnifiedTopology: true, useNewUrlParser: true });

let Schema = mongoose.Schema;

let boardSchema = new Schema({
    boardInfo: [[Number]]
});

let sizeSchema = new Schema({
    size: Number
});

let Size = mongoose.model("Size", sizeSchema);

let fetchSize = cb => {
    Size.find({}, (err, result) => {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
}

let createSize = (info, cb) => {
    Size.create({size: info.size}, (err, response) => {
        if (err) {
            cb(err);
          } else {
            console.log("size created");
            cb(null, response);
          }
    });
}

let deleteSize = (cb) => {
    Size.deleteMany({}, (err) => {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
}

let Board = mongoose.model("Board", boardSchema);

let fetchBoard = cb => {
  Board.find({}, (err, arr) => {
    if (err) {
      cb(err);
    } else {
      cb(null, arr);
    }
  });
};

let createBoard = (info, cb) => {
  Board.create({ boardInfo: info.boardInfo }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      console.log("board created");
      cb(null, res);
    }
  });
};

let setBoard = (info, cb) => {
    Board.updateMany({}, {board: info.boardInfo}, (err, results) => {
        if (err) {
            console.log('error updating board');
            cb(err);
        } else {
            console.log('successfully updated board');
            cb(null, results);
        }
    })
};

let deleteBoard = (cb) => {
  console.log("deleting");
  Board.deleteMany({}, (err) => {
    if (err) {
      console.log("Can't delete.");
      cb(err)
    } else {
        console.log('Board deleted');
        cb(null);
    }
  });
};


module.exports.deleteBoard = deleteBoard;
module.exports.setBoard = setBoard;
module.exports.createBoard = createBoard;
module.exports.fetchBoard = fetchBoard;
module.exports.deleteSize = deleteSize;
module.exports.fetchSize = fetchSize;
module.exports.createSize = createSize;