const BasketItem = Vue.component("basket-item", {
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

export default { BasketItem };
