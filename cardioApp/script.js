'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

// класс Workout создан только для того, чтобы объединить одинаковые параметры классов Running и Cycling
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.distance = distance; // km
    this.duration = duration; // min
    this.coords = coords;
  }

  _setDescription() {
    const date = new Intl.DateTimeFormat('ru-Ru', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(this.date);
    this.type === 'running'
      ? (this.description = `Пробежка ${date}`)
      : (this.description = `Велотренировка ${date}`);
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, temp) {
    super(coords, distance, duration);
    this.temp = temp;
    this.calculatePace();
    this._setDescription();
  }

  calculatePace() {
    this.pace = this.duration / this.distance;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, climb) {
    super(coords, distance, duration);
    this.climb = climb;
    this.calculateSpeed();
    this._setDescription();
  }
  calculateSpeed() {
    this.speed = this.distance / this.duration / 60;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleClimbField);
  }
  _getPosition() {
    //проверяем, есть ли у браузера возможность получить геолокацию
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Невозможно получить Ваше местоположение!');
        }
      );
  }

  _loadMap(position) {
    // получаем широту и долготы обычным способом и через деструктуризацию
    //   const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // on - это что-то вроде eventListener, установленный внутри библиотеки.
    this.#map.on('click', this._showForm.bind(this));
    // this.#mapEvent = e;
    // form.classList.remove('hidden');
    // inputDistance.focus();
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
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _closeForm(e) {
    // Очистка полей ввода данных
    inputDistance.value =
      inputDuration.value =
      inputTemp.value =
      inputClimb.value =
        '';
    form.classList.add('hidden');
  }

  _toggleClimbField() {
    inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
    inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
    inputTemp.value = inputClimb.value = '';
  }

  _newWorkout(e) {
    e.preventDefault();
    // Если после отправки формы снова нажать Enter, то даже при закрытой форме она отправится
    // С помощью пустого return мы это исправляем.
    if (form.classList.contains('hidden')) return;
    const areNumbers = (...numbers) => numbers.every(num => isFinite(num));
    const areNumbersPositive = (...numbers) => numbers.every(num => num > 0);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // Получить данные из формы
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    // Если тренировка - пробежка, создать объект Running
    if (type === 'running') {
      const temp = +inputTemp.value;
      // Проверка валидности данных
      if (
        !areNumbers(distance, duration, temp) ||
        !areNumbersPositive(distance, duration, temp)
      )
        return alert('Введите положительно число!');

      workout = new Running([lat, lng], distance, duration, temp);
    }
    // Если тренировка - вело, то создать объект Cycling
    if (type === 'cycling') {
      const climb = +inputClimb.value;
      // Проверка валидности данных
      if (
        !areNumbers(distance, duration, climb) ||
        !areNumbersPositive(distance, duration)
      )
        return alert('Введите положительно число!');
      workout = new Cycling([lat, lng], distance, duration, climb);
    }

    // Добавить новые объект в массив тренировок
    this.#workouts.push(workout);

    // Отобразить тренировку на карте
    this._displayWorkout(workout);
    // Отобразить тренировку в списке
    this._displayWorkoutOnSidebar(workout);
    // Спрятать форму и очистить поля ввода данных
    this._closeForm.call(this);
  }
  _displayWorkout(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 280,
          minWidth: 100,
          closeOnClick: false,
          autoClose: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚵‍♂️'} ${workout.description}`
      )
      .openPopup();
  }

  _displayWorkoutOnSidebar(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃' : '🚵‍♂️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">км</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">мин</span>
      </div>
    `;

    if (workout.type === 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">📏⏱</span>
      <span class="workout__value">${workout.pace.toFixed(2)}</span>
      <span class="workout__unit">мин/км</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">👟⏱</span>
      <span class="workout__value">${workout.temp}</span>
      <span class="workout__unit">шаг/мин</span>
    </div>
    </li>`;
    }
    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">📏⏱</span>
      <span class="workout__value">${workout.speed.toFixed(2)}</span>
      <span class="workout__unit">км/ч</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🏔</span>
      <span class="workout__value">${workout.climb}</span>
      <span class="workout__unit">м</span>
    </div>
    </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }
}

// Когда мы создаём экземпляр, функции внутри класса сразу же вызываются.
const app = new App();
