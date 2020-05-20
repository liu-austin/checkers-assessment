// jshint esversion:6
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");

let Schema = mongoose.Schema;

let saveSchema = new Schema({
  saved: Boolean
});

let Saved = mongoose.model("Saved", saveSchema);

let createSave = cb => {
  Saved.create({ saved: false }, (err, res) => {
    if (err) {
      console.log("failed to create save");
      cb(err);
    } else {
      console.log("save created");
      cb(null, res);
    }
  });
};

let fetchSave = cb => {
  Saved.find({}, (err, results) => {
    if (err) {
      console.log("failed to fetch save");
      cb(err);
    } else {
      console.log("save fetched");
      cb(null, results);
    }
  });
};

let setSave = (info, cb) => {
  Saved.updateMany({}, { saved: info.isSaved }, (err, results) => {
      if (err) {
        console.log("failed to update saves");
        cb(err);
      } else {
        console.log("save status updated");
        cb(null, results);
      }
    });
};

let deleteSave = (cb) => {
  Saved.deleteMany({}, (err) => {
    if (err) {
      console.log("failed to delete saves");
      cb(err);
    } else {
      console.log("save deleted");
      cb(null);
    }
  });
};

let columnSchema = new Schema({
  column: [Number]
});

let boardSchema = new Schema({
  board: [columnSchema]
});

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
  Board.create({ board: info.boardInfo }, (err, res) => {
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
module.exports.setSave = setSave;
module.exports.fetchSave = fetchSave;
module.exports.deleteSave = deleteSave;
module.exports.createSave = createSave;
