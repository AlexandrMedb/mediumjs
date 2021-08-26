const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

const app = new express();
app.use(bodyParser.json());

addToCart = (ellId) => {
  let el_index = this.basket.contents.findIndex(
    (item) => item.id_product == ellId
  );

  if (el_index == -1) {
    let el = this.goods.find((item) => item.id_product == ellId);
    el.quantity = 1;
    this.basket.contents.push(el);
    this.basket.amount += +el.price;
  } else {
    let el = this.basket.contents[el_index];
    this.basket.amount += +el.price;
    el.quantity++;
  }
  this.basket.countGoods++;
};

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
  // console.log(req.body);
  fs.readFile("./data/cart.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      //

      let ellId = item.id_product;
      let el_index = cart.contents.findIndex((it) => it.id_product == ellId);

      if (el_index == -1) {
        item.quantity = 1;
        cart.contents.push(item);
        cart.amount += +item.price;
      } else {
        let el = cart.contents[el_index];
        cart.amount += +el.price;
        el.quantity++;
      }
      cart.countGoods++;

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

app.post("/cartRemove.json", (req, res) => {
  fs.readFile("./data/cart.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      let elIndex = cart.contents.findIndex(
        (it) => it.id_product == item.id_product
      );
      //
      let el = item;
      cart.amount -= +el.price;
      cart.contents[elIndex].quantity--;

      cart.countGoods--;
      let zero = cart.contents[elIndex].quantity;
      console.log(zero);
      if (!cart.contents[elIndex].quantity) {
        cart.contents.splice(elIndex, 1);
      }

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
