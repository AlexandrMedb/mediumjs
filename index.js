const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "Ноутбук",
    basket: {},
  },
  methods: {
    answer(url) {
      return fetch(url).then(
        (response) => {
          return response.json();
        },
        (reject) => {
          console.log(reject);
        }
      );
    },
    addToCart(ellId) {
      let el_index = this.basket.contents.findIndex(
        (item) => item.id_product == ellId
      );

      if (el_index == -1) {
        let el = this.goods.find((item) => item.id_product == ellId);
        this.basket.contents.push(el);
        this.basket.amount += +el.price;
      } else {
        let el = this.basket.contents[el_index];
        this.basket.amount += +el.price;
        el.quantity++;
      }
      this.basket.countGoods++;
    },
    removeFromCart(ellId) {
      let el = this.basket.contents.find((item) => item.id_product == ellId);
      this.basket.amount -= +el.price;
      el.quantity--;

      this.basket.countGoods--;
    },
    filter() {
      this.filteredGoods = this.goods;
      if (this.searchLine) {
        this.filteredGoods = this.filteredGoods.filter((item) => {
          return (
            item.product_name.toUpperCase() == this.searchLine.toUpperCase()
          );
        });
      }
    },
  },
  mounted() {
    this.answer(`${API_URL}/catalogData.json`).then(
      (goods) => {
        this.goods = goods;
        this.filteredGoods = goods;

        return this.goods;
      },
      (error) => {
        console.log(error);
      }
    );

    this.answer(`${API_URL}/getBasket.json`).then(
      (goods) => {
        this.basket = goods;

        return this.basket;
      },
      (error) => {
        console.log(error);
      }
    );
  },
});

class GoodsItem {
  constructor({ product_name, price }) {
    this.title = product_name;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(
    itemClass,
    place = ".goods-list",
    catalogData = "/catalogData.json"
  ) {
    this.goods = [];
    this.itemClass = itemClass;
    this.place = place;
    this.catalogData = catalogData;
  }
  fetchGoods() {
    return answer(API_URL + this.catalogData).then(
      (goods) => {
        this.goods = goods;

        return this.goods;
      },
      (error) => {
        console.log(error);
      }
    );
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
  constructor({ product_name, price }) {
    super({ product_name, price });
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button>X</button></div>`;
  }
}

class CartList extends GoodsList {
  constructor(
    product_name,
    place = ".cart-list",
    catalogData = "/getBasket.json"
  ) {
    super(product_name, place, catalogData);
  }

  fetchGoods() {
    return answer(API_URL + this.catalogData).then(
      (goods) => {
        this.goods = goods.contents;

        return this.goods;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  clearCart() {}
  removeAllItems() {}

  // Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
  /*
https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
/catalogData.json – получить список товаров;
/getBasket.json – получить содержимое корзины;
/addToBasket.json – добавить товар в корзину;
/deleteFromBasket.json – удалить товар из корзины.
*/
}

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
