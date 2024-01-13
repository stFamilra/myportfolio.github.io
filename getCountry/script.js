'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const displayCountry = function (data, className = '') {
  const currensies = data.currencies;
  const currensyName = Object.values(currensies)[0].name;
  const currensySymbol = Object.values(currensies)[0].symbol;

  const nativeName = data.name.nativeName;
  const officialName = Object.values(nativeName)[0].official;

  // Такую штуку с data.languages я сделал на тот случай, если у страны несколько языков(напр, Канада)
  const html = `<article class="country ${className}">
<img class="country__img" src="${data.flags.svg}" />
<div class="country__data">
<h3 class="country__name">${officialName}</h3>
<h4 class="country__region">${data.region}</h4>
<p class="country__row"><span>👨‍👩‍👧‍👦</span>${(data.population / 1000000).toFixed(
    1
  )} millions</p>
<p class="country__row"><span>🗣️</span>${[
    ...Object.values(data.languages),
  ].join(', ')}</p>
<p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Отображаем ошибку для пользователя, если запрос отклонён
const displayError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity = 1;
};

//////////////////////////////////////////////////////
// const getCountryData = function (countryName) {
//   // Old method
//   const request = new XMLHttpRequest();
//   // Открываем запрос
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

//   // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
//   request.send();

//   // Когда данные будут загружены, сработает слушатель событий(eventListener)
//   request.addEventListener('load', function () {
//     // Используем деструктуризацию, чтобы вывести объект из массива, так как изначально this.responseText - это JSON-строка, находящаяся внутри массива
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const currensies = data.currencies;
//     const currensyName = Object.values(currensies)[0].name;
//     const currensySymbol = Object.values(currensies)[0].symbol;

//     const nativeName = data.name.nativeName;
//     const officialName = Object.values(nativeName)[0].official;

//     // Такую штуку с data.languages я сделал на тот случай, если у страны несколько языков(напр, Канада)
//     const html = `<article class="country">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//     <h3 class="country__name">${officialName}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
//       data.population / 1000000
//     ).toFixed(1)} millions</p>
//     <p class="country__row"><span>🗣️</span>${[
//       ...Object.values(data.languages),
//     ].join(', ')}</p>
//     <p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

const getCountryAndBorderCountries = function (countryName) {
  // Вызов AJAX для получения данных о странеы
  // Old method
  const request1 = new XMLHttpRequest();
  // Открываем запрос
  request1.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

  // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
  request1.send();

  // Когда данные будут загружены, сработает слушатель событий(eventListener)
  request1.addEventListener('load', function () {
    // Используем деструктуризацию, чтобы вывести объект из массива, так как изначально this.responseText - это JSON-строка, находящаяся внутри массива
    const [data1] = JSON.parse(this.responseText);
    console.log(data1);

    //Отобрадение страны
    displayCountry(data1);

    // Получаем первую соседнюю страну
    const [firstHeighbour] = data1.borders;

    if (!firstHeighbour) return;

    // Вызов AJAX для получения данных о соседней стране
    const request2 = new XMLHttpRequest();
    // Открываем запрос
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${firstHeighbour}`
    );

    // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      displayCountry(data2, 'neighbour');
    });
  });
};
// Карточки со странами могут отображаться каждый раз в разном порядке. Это из-за того, что ответы на запросы приходят в разное время. У какой страны первее пришёл запрос, та карточка и будет выводиться первой

// getCountryAndBorderCountries('Russia');

// !!!! Ещё раз повторю - это старый метод !!!!
// const request = new XMLHttpRequest();
// //   // Открываем запрос
// //   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

// //   // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
// //   request.send();

// new method

const getDataAndConvertToJSON = function (
  url,
  errorMessage = 'Что-то пошло не так.'
) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMessage} Ошибка ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (countryName) {
//   // Такой вызов сразу возвращает нам promice, и в самом начале он находится в состоянии ожидания(pendind), потому что ассинхронная задача длится какое-то время в фоновом режиме
//   // потом, когда задача решена, promice переходит в состояние Решено(либо выполнено, либо отклонено). По сути, отклониться запрос, вызванный с помощью fetch, может только если у пользователя отключился интернет
//   // для результата промиса мы можем вызвать метод .then(), в которую пихаем колбек-функцию. Она сработает, когда промис перейдёт в состояние "Решено"

//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     // второй аргумент срабатывает, если запрос был отклонён. Аргументом функции является сама ошибка, из-за которой был отклонен запрос. Если второй фунции не будет, то при отклонении запроса в консоли вылезет уведомление о том, что ошибка не была "отловлена", потому что при запуске второй функции цепочка промисов прерывается(то есть те промисы, которые идут после в цепочке промисов, уже не срабатывают)
//     // чтобы не писать у каждого промиса вторую функцию с отловом ошибки, можно в конце написать .catch(callback)
//     .then(
//       function (response) {
//         // Чтобы в response считать данные, надо вызвать для него метод .json(), но есть проблема - этот метод является ассинхронным, то есть он возвращает новый промис, поэтому нам нужно ещё раз вызвать метод .then()
//         console.log(response);
//         // при помощи throw мы выбрасываем новую ошибку и выходим из функции, как при вызове return
//         if (!response.ok)
//           throw new Error(`Страна не найдена! Ошибка ${response.status}`);

//         // Возвращаем новый promice

//         return response.json();
//       }
//       //,   error => alert(error)
//     )
//     .then(function (data) {
//       // теперь мы уже получили массив, в котором находится объект с описанием страны
//       console.log(data);
//       displayCountry(data[0]);
//       // выводим соседнюю страну
//       const firstNeighbour = data[0].borders[0];
//
//       if (!firstNeighbour) return;
//       // возвращаем новый промис
//       return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`У страны нет соседа! Ошибка ${response.status}`);

//       return response.json();
//     })
//     .then(data => displayCountry(data[0], 'neighbour'))
//     .catch(error => {
//       console.log(`e:`, error);
//       console.log(`mes:`, error.message);
//       console.error(`${error} тут ошибка!!`);
//       displayError(`Что-то случилось! Запрос отклонён.`);
//     })
//     // функция метода finally срабатывает всегда, независимо от того, отклонён ли промис или выполнен
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (countryName) {
  getDataAndConvertToJSON(
    `https://restcountries.com/v3.1/name/${countryName}`,
    'Страна не найдена.'
  )
    .then(function (data) {
      displayCountry(data[0]);
      if (!data[0].borders) throw new Error('У страны нет соседей!');

      const firstNeighbour = data[0].borders[0];
      // if (!firstNeighbour) throw new Error('У страны нет соседей!');

      return getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/alpha/${firstNeighbour}`,
        'Страна не найдена.'
      );
    })
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(error => {
      console.log(`error:`, error);
      console.log(`message:`, error.message);
      console.error(`${error}`);
      displayError(`Запрос отклонён. ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('japan');
});

// функция displayCountryByGPS отображает на странице страну, координаты которой переданы в аргументы
// lat(latitude) - широта; lng(longitude) - долгота!
// API работает с VPN!! Без него будет вылезать ошибка.
const displayCountryByGPS = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=520982546676250361625x14576 `
  )
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Запрос не удался!`);
      return response.json();
    })
    .then(response => {
      console.log(response);
      if (!response.region)
        throw new Error(`По этим координатам страна не найдена!`);
      console.log(`You are in ${response.region}`);
      // Отображаем страну
      getCountryData(response.country);
    })
    .catch(error => {
      console.error(`${error}`);
      displayError(`Запрос отклонён. ${error.message}`);
    });
};

displayCountryByGPS(35.756, 139.256);
displayCountryByGPS(48.857, 2.358);
displayCountryByGPS(40.708, -74.051);
