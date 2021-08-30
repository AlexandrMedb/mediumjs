const BasketList = Vue.component("basket-list", {
  props: ["goods"],
  template: `
  <div>
  <h2 class="goods-list">Корзина</h2>
  <div class="goods-list">
  <basket-item v-for="item in goods" :item="item"></basket-item>
  </div>
  </div>`,
});

export default { BasketList };
