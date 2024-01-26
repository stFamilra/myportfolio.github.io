'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');

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
    1,
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
  countriesContainer.style.opacity = 1;
};

const getCountryAndBorderCountries = function (countryName) {
  // Вызов AJAX для получения данных о стране
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
      `https://restcountries.com/v3.1/alpha/${firstHeighbour}`,
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

const getDataAndConvertToJSON = function (
  url,
  errorMessage = 'Что-то пошло не так.',
) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMessage} Ошибка ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (countryName) {
//   getDataAndConvertToJSON(
//     `https://restcountries.com/v3.1/name/${countryName}`,
//     'Страна не найдена.'
//   )
//     .then(function (data) {
//       displayCountry(data[0]);
//       if (!data[0].borders) throw new Error('У страны нет соседей!');

//       const firstNeighbour = data[0].borders[0];
//       // if (!firstNeighbour) throw new Error('У страны нет соседей!');

//       return getDataAndConvertToJSON(
//         `https://restcountries.com/v3.1/alpha/${firstNeighbour}`,
//         'Страна не найдена.'
//       );
//     })
//     .then(data => displayCountry(data[0], 'neighbour'))
//     .catch(error => {
//       console.log(`error:`, error);
//       console.log(`message:`, error.message);
//       console.error(`${error}`);
//       displayError(`Запрос отклонён. ${error.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('japan');
// });

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

// const getCountryAndBorderCountries = function (countryName) {
//   // Вызов AJAX для получения данных о странеы
//   // Old method
//   const request1 = new XMLHttpRequest();
//   // Открываем запрос
//   request1.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

//   // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
//   request1.send();

//   // Когда данные будут загружены, сработает слушатель событий(eventListener)
//   request1.addEventListener('load', function () {
//     // Используем деструктуризацию, чтобы вывести объект из массива, так как изначально this.responseText - это JSON-строка, находящаяся внутри массива
//     const [data1] = JSON.parse(this.responseText);
//     console.log(data1);

//     //Отобрадение страны
//     displayCountry(data1);

//     // Получаем первую соседнюю страну
//     const [firstHeighbour] = data1.borders;

//     if (!firstHeighbour) return;

//     // Вызов AJAX для получения данных о соседней стране
//     const request2 = new XMLHttpRequest();
//     // Открываем запрос
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${firstHeighbour}`
//     );

//     // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       displayCountry(data2, 'neighbour');
//     });
//   });
// };
// Карточки со странами могут отображаться каждый раз в разном порядке. Это из-за того, что ответы на запросы приходят в разное время. У какой страны первее пришёл запрос, та карточка и будет выводиться первой

// getCountryAndBorderCountries('Russia');

// !!!! Ещё раз повторю - это старый метод !!!!
// const request = new XMLHttpRequest();
// //   // Открываем запрос
// //   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

// //   // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
// //   request.send();

// new method

// const getDataAndConvertToJSON = function (
//   url,
//   errorMessage = 'Что-то пошло не так.'
// ) {
//   return fetch(url).then(response => {
//     if (!response.ok)
//       throw new Error(`${errorMessage} Ошибка ${response.status}`);
//     return response.json();
//   });
// };

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

// const getCountryData = function (countryName) {
//   getDataAndConvertToJSON(
//     `https://restcountries.com/v3.1/name/${countryName}`,
//     'Страна не найдена.'
//   )
//     .then(function (data) {
//       displayCountry(data[0]);
//       if (!data[0].borders) throw new Error('У страны нет соседей!');

//       const firstNeighbour = data[0].borders[0];
//       // if (!firstNeighbour) throw new Error('У страны нет соседей!');

//       return getDataAndConvertToJSON(
//         `https://restcountries.com/v3.1/alpha/${firstNeighbour}`,
//         'Страна не найдена.'
//       );
//     })
//     .then(data => displayCountry(data[0], 'neighbour'))
//     .catch(error => {
//       console.log(`error:`, error);
//       console.log(`message:`, error.message);
//       console.error(`${error}`);
//       displayError(`Запрос отклонён. ${error.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('japan');
// });

// функция displayCountryByGPS отображает на странице страну, координаты которой переданы в аргументы
// lat(latitude) - широта; lng(longitude) - долгота!
// API работает с VPN!! Без него будет вылезать ошибка.
// const displayCountryByGPS = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=520982546676250361625x14576 `
//   )
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Запрос не удался!`);
//       return response.json();
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.region)
//         throw new Error(`По этим координатам страна не найдена!`);
//       console.log(`You are in ${response.region}`);
//       // Отображаем страну
//       getCountryData(response.country);
//     })
//     .catch(error => {
//       console.error(`${error}`);
//       displayError(`Запрос отклонён. ${error.message}`);
//     });
// };

// displayCountryByGPS(35.756, 139.256);
// displayCountryByGPS(48.857, 2.358);
// displayCountryByGPS(40.708, -74.051);

//////////////////////////////////
// !!! --- Пример работы с циклом событий(с event loop) --- !!!

// console.log('Начало теста');

// // Callback-функция внутри setTimeOut будет помещена в очередь callbacks через 0 секунд
// setTimeout(() => console.log('Таймер 0 секунду'), 0);

// // С помощью метода .resolve() мы создаём промис, у которого сразу же будет значение "Успех"
// Promise.resolve('Выполненное promise 1').then(result => console.log(result));
// console.log('Конец теста');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Происходит розыгрыш!');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('Вы выиграли!');
//     } else {
//       reject(new Error('Вы проиграли!'));
//     }
//   }, 3000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying (промисификация) функции setTimeout().
// Промисификация - это преобразование callback в promise.
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3)
//   .then(() => {
//     console.log('Длительность ожидания 3 секунды');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('Длительность ожидания 2 секунды');
//   });

// wait(1)
//   .then(() => {
//     console.log('Прошла 1 секунда');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошло 2 секунды');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошло 3 секунды');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошло 4 секунды');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Прошло 5 секунды');
//     return wait(1);
//   });

// const waitSeconds = function (sec) {
//   for (let i = 1; i <= sec; i++) {
//     wait(i).then(() => {
//       console.log(`Прошло ${i} секунды`);
//     });
//   }
// };

// waitSeconds(5);

////////////////////
// Промисификация API Геолокации

// const getUserPosition = function () {
//   return new Promise(function (resolve, reject) {
//     //   navigator.geolocation.getCurrentPosition(
//     //     position => resolve(position),
//     //     e => reject(console.error(e))
//     //   );
//     // Это то же самое:
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getUserPosition()
//   .then(pos => console.log(pos))
//   .catch(e => console.error(e));

// const displayUserCountry = function () {
//   getUserPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=520982546676250361625x14576 `
//       );
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Запрос не удался!`);
//       return response.json();
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.region)
//         throw new Error(`По этим координатам страна не найдена!`);
//       console.log(`You are in ${response.region}`);
//       // Отображаем страну
//       getCountryData(response.country);
//     })
//     .catch(error => {
//       console.error(`${error}`);
//       displayError(`Запрос отклонён. ${error.message}`);
//     });
// };

// displayUserCountry();
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// let currentImage;

// const createImageElement = function (imagePath) {
//   return new Promise(function (resolve, reject) {
//     const imgEl = document.createElement('img');
//     imgEl.src = imagePath;
//     console.log(imgEl);
//     imgEl.addEventListener('load', e => {
//       images.insertAdjacentElement('beforeend', imgEl);
//       resolve(imgEl);
//     });

//     imgEl.addEventListener('error', e => {
//       reject(new Error('Изображение не найдено!'));
//     });
//   });
// };

// createImageElement('img/image1.jpg')
//   .then(image => {
//     currentImage = image;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImageElement('img/image2.jpg');
//   })
//   .then(image => {
//     currentImage = image;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(e => console.error(e));

// const getUserPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // Когда мы ставим async перед словом function, то такая функция будет работать ассинхронно(в фоновом режиме) и вернёт промис, когда код внутри полностью будет выполнен
// const getCountryData = async function () {
//   // await останавливает код ВНУТРИ функции, пока не получит выполненное promice(то есть код снаружи функции останавливаться не будет, а значит, что стек вызовов блокироваться не будет)

//   try {
//     const userPosition = await getUserPosition();
//     const { latitude: lat, longitude: lng } = userPosition.coords;

//     const geocodingResponse = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=520982546676250361625x14576 `
//     );

//     if (!geocodingResponse.ok)
//       throw new Error('Проблема с извлечением  местоположения');

//     const geocodingData = await geocodingResponse.json();
//     console.log('geocodingData: ', geocodingData);

//     const response = await fetch(
//       `https://restcountries.com/v3.1/name/${geocodingData.country.toLowerCase()}`
//     );

//     if (!response.ok) throw new Error('Проблема с получением страны');

//     const data = await response.json();
//     console.log('data:', data);
//     displayCountry(data[0]);

//     return `You're in ${geocodingData.city}, ${geocodingData.country}`;
//   } catch (e) {
//     console.error(`Ошибка! ${e}`);
//     displayError(`Что-то пошло не так. ${e.message}`);

//     // Отклоняем promise, возвращаемое из ассинхронной функции
//     throw e;
//   }

//   // то же самое, только без asyncAwait:
//   // fetch(`https://restcountries.com/v3.1/name/${geocodingData}`).then(response =>
//   //   console.log(response)
//   // );
// };

// getCountryData()
//   .then(place => console.log(place))
//   .catch(err => console.log(err.message))
//   .finally(() => console.log('Получили местоположение!'));

// Делаем код выше, но с помощью asyncAwait
// Т.к await можно использовать лишь в паре с async, будем создавать IIFE

// (async function () {
//   try {
//     const place = await getCountryData();
//     console.log('countryData:', place);
//   } catch (err) {
//     console.log(err.message);
//   }
//   console.log('Получили местоположение!');
// })();

const print3CountriesCapitals = async function (country1, country2, country3) {
  try {
    // const [country1Data] = await getDataAndConvertToJSON(
    //   `https://restcountries.com/v3.1/name/${country1}`
    // );
    // const [country2Data] = await getDataAndConvertToJSON(
    //   `https://restcountries.com/v3.1/name/${country2}`
    // );
    // const [country3Data] = await getDataAndConvertToJSON(
    //   `https://restcountries.com/v3.1/name/${country3}`
    // );

    // Когда нам нужно выполнить несколько ассинхронных операций, которые не зависят друг от друга, нам нужно выполнить их параллельно:
    const countriesData = await Promise.all([
      getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/name/${country1}`,
      ),
      getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/name/${country2}`,
      ),
      getDataAndConvertToJSON(
        `https://restcountries.com/v3.1/name/${country3}`,
      ),
    ]);

    console.log(countriesData.map(countryData => countryData[0].capital));
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////////

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImageElement = function (imagePath) {
  return new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = imagePath;
    console.log(imgEl);
    imgEl.addEventListener('load', e => {
      images.insertAdjacentElement('beforeend', imgEl);
      resolve(imgEl);
    });

    imgEl.addEventListener('error', e => {
      reject(new Error('Изображение не найдено!'));
    });
  });
};
// createImageElement('img/image1.jpg')
//   .then(image => {
//     currentImage = image;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImageElement('img/image2.jpg');
//   })
//   .then(image => {
//     currentImage = image;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(e => console.error(e));

const loadAndWait = async function () {
  try {
    // loading the first image
    let image = await createImageElement('img/image1.jpg');
    await wait(2);
    image.style.display = 'none';

    // loading the second image
    image = await createImageElement('img/image2.jpg');
    await wait(2);
    image.style.display = 'none';

    // loading the third image
    image = await createImageElement('img/image3.jpg');
    await wait(2);
    image.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

// loadAndWait('img/image1.jpg', 'img/image2.jpg', 'img/image3.jpg');

// loadAndWait();

// const loadAllImages = async function (imagePathsArray) {
//   try {
//     const images = await Promise.all(
//       imagePathsArray.map(async cur => await createImageElement(cur))
//     );

//     images.forEach(image => image.classList.add('parallel'));
//     console.log(images);
//   } catch (error) {
//     console.error(error);
//   }
// };

// loadAllImages(['img/image1.jpg', 'img/image2.jpg', 'img/image3.jpg']);
