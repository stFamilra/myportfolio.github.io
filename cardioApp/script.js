'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

let map, mapEvent;
//проверяем, есть ли у браузера возможность получить геолокацию
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // получаем широту и долготы обычным способом и через деструктуризацию
      //   const latitude = position.coords.latitude;
      // const longitude = position.coords.longitude
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // on - это что-то вроде eventListener, установленный внутри библиотеки.
      map.on('click', e => {
        mapEvent = e;
        form.classList.remove('hidden');
        inputDistance.focus();
        // console.log(e);
        // L.marker(e.latlng)
        //   .addTo(map)
        //   .bindPopup(
        //     L.popup({
        //       maxWidth: 200,
        //       minWidth: 100,
        //       closeOnClick: false,
        //       autoClose: false,
        //       className: 'running-popup',
        //     })
        //   );
        //   .setPopupContent('Тренировка')
        //   .openPopup();
      });
    },
    function () {
      alert('Невозможно получить Ваше местоположение!');
    }
  );

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(mapEvent);
  // Очистка полей ввода данных
  inputDistance.value =
    inputDuration.value =
    inputTemp.value =
    inputClimb.valuue =
      '';

  // Отображение маркера
  L.marker(mapEvent.latlng)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 200,
        minWidth: 100,
        closeOnClick: false,
        autoClose: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Тренировка')
    .openPopup();
});

inputType.addEventListener('change', e => {
  inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
  inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
});
