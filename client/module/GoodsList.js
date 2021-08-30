const GoodsList = Vue.component("goods-list", {
  props: ["goods"],
  template: `<div>
  <h2 class="goods-list">Товары</h2>
    <div class="goods-list">
          <goods-item v-for="item in goods" :item="item"></goods-item>
        </div></div>`,
});

export default { GoodsList };
