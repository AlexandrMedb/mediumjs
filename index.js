class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(itemClass, place = ".goods-list") {
    this.goods = [];
    this.itemClass = itemClass;
    this.place = place;
  }
  fetchGoods() {
    this.goods = [
      { title: "Shirt", price: 150 },
      { title: "Socks", price: 50 },
      { title: "Jacket", price: 350 },
      { title: "Shoes", price: 250 },
    ];
  }
  addOneItem() {}
  removeOneItem() {}

  render() {
    let goodsList = document.querySelector(this.place);
    this.goods.map((element) => {
      goodsList.insertAdjacentHTML(
        "beforeend",
        new this.itemClass(element).render()
      );
    });
  }

  countTotalSum() {
    return this.goods.reduce((sum, { price }) => sum + price, 0);
  }
}

class CartItem extends GoodsItem {
  constructor({ title, price }) {
    super({ title, price });
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button>X</button></div>`;
  }
}

class CartList extends GoodsList {
  constructor(itemClass, place = ".cart-list") {
    super(itemClass, place);
  }
  clearCart() {}
  removeAllItems() {}
}

let item = { title: "Shirt", price: 150 };

const list = new GoodsList(GoodsItem);
list.fetchGoods();
list.render();
const cartList = new CartList(CartItem);
cartList.fetchGoods();

cartList.render();

/* Некая сеть фастфуда предлагает несколько видов гамбургеров:
Маленький (50 рублей, 20 калорий).
Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
С сыром (+10 рублей, +20 калорий).
С салатом (+20 рублей, +5 калорий).
С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий)
*/

class engridient {
  constructor(nameEng, price, callories, category = "main") {
    this.nameEng = nameEng;
    this.price = price;
    this.callories = callories;
    this.category = category;
  }
}
const cheeze = new engridient("cheeze", 10, 20);
const salad = new engridient("salad", 20, 5);
const potato = new engridient("potato", 15, 10);
const spice = new engridient("spice", 15, 0, "topping");
const mayo = new engridient("mayo", 20, 5, "topping");

class Hamburger {
  constructor(size = "big", ...engridients) {
    this.size = size;
    this.engridients = engridients;
  }
  cauntCallories() {
    return this.engridients.reduce((sum, { callories }) => sum + callories, 0);
  }
  cauntPrice() {
    return this.engridients.reduce((sum, { price }) => sum + price, 0);
  }
  get hamburgersize() {
    return this.size;
  }
  get hamburgerEngridients() {
    let arr = [];
    this.engridients.map(({ nameEng }) => {
      arr.push(nameEng);
    });
    return arr;
  }
  get hamburgerToppings() {
    let arr = [];
    this.engridients.map(({ nameEng, category }) => {
      if (category === "topping") arr.push(nameEng);
    });
    return arr;
  }

  addaddTopping(obj) {
    if (obj instanceof engridient) {
      this.engridients.push(obj);
    }
  }
  removeTopping(obj) {
    if (obj instanceof engridient) {
      let i = this.engridients.indexOf(obj);
      if (i != -1) {
        this.engridients = this.engridients
          .slice(0, i)
          .concat(this.engridients.slice(i + 1));
      }
    }
  }
}

const standartHamburger = ["big", spice, salad, cheeze, cheeze, salad, mayo];

let bk = new Hamburger(...standartHamburger);


