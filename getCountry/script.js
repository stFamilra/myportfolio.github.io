'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////
const getCountryData = function (countryName) {
  // Old method
  const request = new XMLHttpRequest();
  // Открываем запрос
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

  // Отправляем запрос GET по url. Этот запрос будет извлекать данные в фоновом режиме(т.е ассинхронно)
  request.send();

  // Когда данные будут загружены, сработает слушатель событий(eventListener)
  request.addEventListener('load', function () {
    // Используем деструктуризацию, чтобы вывести объект из массива, так как изначально this.responseText - это JSON-строка, находящаяся внутри массива
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const currensies = data.currencies;
    const currensyName = Object.values(currensies)[0].name;
    const currensySymbol = Object.values(currensies)[0].symbol;

    const nativeName = data.name.nativeName;
    const officialName = Object.values(nativeName)[0].official;

    // Такую штуку с data.languages я сделал на тот случай, если у страны несколько языков(напр, Канада)
    const html = `<article class="country">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${officialName}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
      data.population / 1000000
    ).toFixed(1)} millions</p>
    <p class="country__row"><span>🗣️</span>${[
      ...Object.values(data.languages),
    ].join(', ')}</p>
    <p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
  </div>
</article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// Карточки со странами могут отображаться каждый раз в разном порядке. Это из-за того, что ответы на запросы приходят в разное время. У какой страны первее пришёл запрос, та карточка и будет выводиться первой

getCountryData('Ukraine');
getCountryData('Russia');
getCountryData('Canada');
