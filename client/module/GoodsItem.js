const GoodsItem = Vue.component("goods-item", {
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

export default { GoodsItem };
