// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongooseHelper = require("./mongoose-helper");
const http = require('http');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/size", function (req, res) {
    mongooseHelper.fetchSize((err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });

  app.post("/size", function (req, res) {
    mongooseHelper.createSize(req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send(results);
      }
    });
  });

  app.delete("/size", function (req, res) {
    mongooseHelper.deleteSize((err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send('deleted');
      }
    });
  });

app.get("/board", function (req, res) {
  mongooseHelper.fetchBoard((err, results) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/board", function (req, res) {
  mongooseHelper.createBoard(req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(201).send(results);
    }
  });
});

app.put("/board", function (req, res) {
    mongooseHelper.setBoard(req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send(results);
      }
    });
  });

  app.delete("/board", function (req, res) {
    mongooseHelper.deleteBoard((err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send('deleted');
      }
    });
  });

let port = 1128;

var server = http.createServer(app);
server.listen(port, function () {
  console.log(`listening on port ${port}`);
});
