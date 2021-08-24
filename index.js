const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

const app = new express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
app.use(express.static("./client"));

app.get("/", (req, res) => {
  res.send("index.js");
});

app.get("/catalog.json", (req, res) => {
  fs.readFile("./data/catalog.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

app.get("/cart.json", (req, res) => {
  fs.readFile("./data/cart.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

app.post("/cartAdd.json", (req, res) => {
  console.log(req.body);
  fs.readFile("./data/cart.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.send('{"result": 0}');
    } else {
      console.log(req.body);
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);

      fs.writeFile("./data/cart.json", JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});
