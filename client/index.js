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
    this.answer(`/catalog.json`).then(
      (goods) => {
        this.goods = goods;
        this.filteredGoods = goods;

        return this.goods;
      },
      (error) => {
        console.log(error);
      }
    );

    this.answer(`/cart.json`).then(
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
    <button @click="response">
      Добавить в корзину
    </button>
  </div> `,
  methods: {
    response() {
      fetch("/cartAdd.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(this.item),
      });
      location.reload();
    },
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
  <button @click="response">X</button>
</div>
  `,
  methods: {
    response() {
      fetch("/cartRemove.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(this.item),
      });
      location.reload();
    },
  },
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
