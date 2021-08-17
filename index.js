const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

const renderGoodsItem = (item) => {
  return `<div class="goods-item"><h3>${item.title}</h3><p>${item.price}</p></div>`;
};

const renderGoodsList = (list) => {
  let goodsList = document.querySelector(".goods-list");
  list.forEach((element) => {
    goodsList.insertAdjacentHTML("beforeend", renderGoodsItem(element));
  });
};

renderGoodsList(goods);
