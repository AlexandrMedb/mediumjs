const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const answer = (url) => {
  return fetch(url).then(
    (response) => {
      return response.json();
    },
    (reject) => {
      console.log(reject);
    }
  );
};

const add = (url, e) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(e),
  }).then(
    (response) => {
      return response.json();
    },
    (reject) => {
      console.log(reject);
    }
  );
};

// const answer = (url) => {
//   return new Promise((resolve, reject) => {
//     var xhr;

//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           resolve(xhr.responseText);
//         } else {
//           reject("Error");
//         }
//       }
//     };

//     xhr.open("GET", url, true);
//     xhr.send();
//   });
// };

// const answer = (url) => {
//   return fetch(url)
//     .then((response) => {
//       return response;
//     })
//     .then((data) => {
//       console.log(data);
//     });
// };

/*
https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
/catalogData.json – получить список товаров;
/getBasket.json – получить содержимое корзины;
/addToBasket.json – добавить товар в корзину;
/deleteFromBasket.json – удалить товар из корзины.
*/
// Переделайте makeGETRequest() так, чтобы она использовала промисы.
// Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
// * Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.
