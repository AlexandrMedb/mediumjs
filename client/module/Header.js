const header = Vue.component("vue-header", {
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

export default { header };
