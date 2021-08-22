const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "Ноутбук",
    basket: {},
    trying: "ds",
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
        el.quantity = 1;
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
      if (!el.quantity) {
        let elIndex = this.basket.contents.findIndex(
          (item) => item.id_product == ellId
        );
        this.basket.contents.splice(elIndex, 1);
      }
    },
    filter(a) {
      this.searchLine = a;
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

Vue.component("goods-list", {
  props: ["goods"],
  template: `<div>
  <h2 class="goods-list">Товары</h2>
    <div class="goods-list">
          <goods-item v-for="item in goods" :item="item"></goods-item>
        </div></div>`,
});

Vue.component("goods-item", {
  props: ["item"],
  template: `<div class="goods-item">
    <h3>{{item.product_name}}</h3>
    <p>{{item.price}}</p>
    <button @click="addToCart(item.id_product)">
      Добавить в корзину
    </button>
  </div> `,
  data() {
    return {
      name: "Frodo",
    };
  },
});

Vue.component("basket-list", {
  props: ["goods"],
  template: `
  <div>
  <h2 class="goods-list">Корзина</h2>
  <div class="goods-list">
  <basket-item v-for="item in goods" :item="item"></basket-item>
  </div>
  </div>`,
});

Vue.component("basket-item", {
  props: ["item"],
  template: ` <div class="goods-item" v-if="item.quantity!=0">
  <h3>{{item.product_name}}</h3>
  <p>{{item.price}}</p>
  <p>Количество {{item.quantity}}</p>
  <button @click="removeFromCart(item.id_product)">X</button>
</div>
  `,
});

Vue.component("vue-header", {
  props: ["search"],
  data() {
    return {
      // searchLine: "Frodo",
    };
  },

  template: `<div>
  
  <header class="header container">
   <input type="text" class="goods-search" v-model="search" />
  <button class="search-button" type="button" 
  v-on:click="$emit('filter-goods', search)">
   Искать
 </button>
  <button class="cart-button" type="button">Корзина</button> </header>
  </div>`,
});
