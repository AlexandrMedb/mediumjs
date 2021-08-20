//задания 1-2
let text =
  "'прямая в начале ' не прямая 'прямая'с аперсантом в середине' не прямая 'прямая вконце' ";
let text2 = "'lorem ' lorem 'lorem'a lorem' lorem 'lorem'";

const replace = (text) => {
  let opt = /'\W/g;
  let opt2 = /(\W|^)'/g;
  text = text.replace(opt, '" ').replace(opt2, ' "').trim();
  console.log(text);
};

replace(text);
replace(text2);

//функция странно отрабатывает первый символ на кирилице в причинах не разбирался

//3е задание
const telTest = /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
// const emailTest = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
const emailTest = /\w+@mail\.ru/;

document.querySelector(".hw4 button").addEventListener("click", (e) => {
  let form = document.querySelector(".hw4");

  if (!test(form.tel.value, telTest)) {
    form.tel.style.border = "1px solid red";
    e.preventDefault();
  }

  if (!test(form.email.value, emailTest)) {
    form.email.style.border = "1px solid red";
    e.preventDefault();
  }
});

function test(data, test) {
  return test.test(data);
}

// Имя содержит только буквы.
// b.  Телефон имеет вид +7(000)000-0000.
// c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d.  Текст произвольный.
// e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
