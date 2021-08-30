import Header from "./module/Header";
import GoodsList from "./module/GoodsList";
import GoodsItem from "./module/GoodsItem";
import BasketList from "./module/BasketList";
import BasketItem from "./module/BasketItem";

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
