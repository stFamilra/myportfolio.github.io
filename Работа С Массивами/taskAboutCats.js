// Женя и Юля изучают кошек. Каждая из них узнала у 10 владельцев кошек о возрасте их кошки и сохранила данные в массиве (по одному массиву для каждой девочки). На данный момент им просто интересно узнать, является ли кошка взрослой или котёнком.
// Кошка считается взрослой, если ей не менее 2 лет, и котёнком, если ей менее 2 лет.
// Создайте функцию verifyCats, которая принимает 2 массива возрастов кошек (catsJane и catsJulia) и выполняет следующие действия:
// 1. Женя выяснила, что владельцы первой и последней кошки на самом деле имеют собак, а не кошек! Поэтому создайте неглубокую (shallow) копию массива Жени и удалите возраст собак из этого скопированного массива (потому что это плохая практика изменять параметры функции).
// 2. Создайте массив с данными Жени (исправленными) и Юли.
// 3. Для каждой оставшейся кошки выведите в консоль,  если она взрослая: ("Кошка № 1 взрослая, ей 6 лет "), если котёнок (" Кошка № 2 ещё котёнок ")
// 4. Вызовите функцию для обоих наборов тестовых данных.
// Тестовые данные:
// Данные Жени [4, 5, 3, 11, 6, 2, 4, 1, 5, 9] 
// Данные Юли [2, 4, 5, 1, 13, 2, 15, 8, 3, 7]
// Данные Жени [3, 5, 9, 14, 1, 2, 6, 8, 3, 10] 
// Данные Юли [8, 2, 10, 1, 2, 5, 6, 3, 1, 4]


// const verifyCats = (catsJane, catsJulia) => {
//     const janesArray = catsJane.slice(1, -1);
//     const commonArray = [...janesArray, catsJulia];
//     const isAdult = (age, index) => age >= 2 ? `The cat № ${index} is adult, it's ${age}` : `The cat № ${index} is still a kitten`;
//     commonArray.forEach(function (value, index) {
//         console.log(isAdult(value, index + 1));
//     })
// }

// verifyCats([4, 5, 3, 11, 6, 2, 4, 1, 5, 9], [2, 4, 5, 1, 13, 2, 15, 8, 3, 7]);
// verifyCats([3, 5, 9, 14, 1, 2, 6, 8, 3, 10] , [8, 2, 10, 1, 2, 5, 6, 3, 1, 4]);


/** 
 * task 2
 *  Вернемся к исследованию кошек Женей и Юлей. На этот раз они хотят преобразовать возраст кошек в человеческий возраст и вычислить средний возраст кошек в своем исследовании.
Создайте функцию getAverageHumanAge, которая принимает массив возрастов кошек (catAges) и выполняет следующие действия по порядку:

1. Рассчитывает человеческий возраст по следующей формуле: если возраст кошки <= 2 года, человеческий возраст = возраст кошки * 10. Если кошке больше 2 лет, человеческий возраст = возраст кошки * 7.
2. Исключает всех кошек младше 18 человеческих лет.
3. Возвращает средний человеческий возраст для всех взрослых кошек. 

Вызовите функцию для обоих наборов тестовых данных.
Тестовые данные:
1: [7 , 3, 2, 4, 1, 15, 8, 1, 9, 2] 
2: [1, 16, 12, 4, 5, 1, 3, 11, 7, 2]

*/

// const getAverageHumanAge = catAges => 
// catAges
// .map(current => current <= 2 ? current * 10 : current * 7)
// .filter(current => current >= 18)
// .reduce((acc, current, index, arr) => acc + current / arr.length, 0)

// getAverageHumanAge([7 , 3, 2, 4, 1, 15, 8, 1, 9, 2]);
// getAverageHumanAge([1, 16, 12, 4, 5, 1, 3, 11, 7, 2]);

// console.log(getAverageHumanAge([7 , 3, 2, 4, 1, 15, 8, 1, 9, 2]));
// console.log(getAverageHumanAge([1, 16, 12, 4, 5, 1, 3, 11, 7, 2]));



// task 3
// Женя с Юлей все еще изучают кошек, и на этот раз они изучают, едят ли кошки слишком много или слишком мало.
// Слишком много еды означает, что текущая порция пищи кошки больше рекомендуемой, а слишком мало еды - наоборот.
// Нормальное количество еды означает, что текущая порция корма для кошки находится в диапазоне от 10% выше и 10% ниже рекомендуемой порции.
// ( рекомендуемая * 0.9 < нормальная < рекомендуемая * 1.1 )

const cats = [
    { catWeight: 3, foodWeight: 25, owners: ['Наташа'] },
    { catWeight: 6, foodWeight: 90, owners: ['Марина', 'Алиса'] },
    { catWeight: 4, foodWeight: 45, owners: ['Алекс', 'Ирина'] },
    { catWeight: 7, foodWeight: 80, owners: ['Борис'] },
   ];

// 1. Переберите элементы массива cats, которые являются объектами, и для каждой кошки вычислите рекомендуемую порцию еды и добавьте ее к объекту, как новое свойство. Не создавайте новый массив, просто переберите массив! 
// Формула вычисления рекомендуемой порции:
// рекомендуемая порция = вес кошки * 0.75 * 12 (результат в граммах, а вес кошки в килограммах).

const getRecomendatedPortion = catsArray => {

    catsArray.forEach(current => current.recomendatedPortion = current.catWeight * 0.75 * 12);
}
getRecomendatedPortion(cats)


// 2. Найдите кошку, имя хозяина которой Алекс и выведите в консоль, ест ли эта кошка слишком много или слишком мало. Подсказка: у некоторых кошек есть несколько владельцев, поэтому вам сначала нужно найти Алекса в массиве владельцев.

const getNutritionbyOwner = (owner, arr = cats) => {
    const currentCat = arr.find(current => current.owners.includes(owner));
    const catEats = currentCat.foodWeight === currentCat.recomendatedPortion ? 'recomendation' : currentCat.foodWeight < currentCat.recomendatedPortion * 1.1 && currentCat.foodWeight > currentCat.recomendatedPortion * 0.9 ? 'normal' :  currentCat.foodWeight > currentCat.recomendatedPortion * 1.1 ? 'too much' : currentCat.foodWeight < currentCat.recomendatedPortion * 0.9 ? 'too little' : 0;
    
    currentCat.howNormalNutrition = catEats;

    console.log(`Cat, who has owner is ${owner} eats ${catEats} food`);

}

getNutritionbyOwner('Алекс')

// 3. Создайте массив, содержащий всех владельцев кошек, которые слишком много едят (catsEatTooMuchOwners), и массив со всеми владельцами кошек, которые слишком мало едят (catsEatTooLittleOwners).

const allCatsOwners = cats.flatMap(current => current.owners);

console.log(`all: ${allCatsOwners}`);

allCatsOwners.forEach(current => getNutritionbyOwner(current));



// const catEatTooLittleOwners = allCatsOwners.filter(current => current.howNormalNutrition === 'too litle');
// const catEatTooMuchOwners = allCatsOwners.filter(current => current.howNormalNutrition === 'too much');

const catEatTooLittleOwners = cats.filter(current => current.howNormalNutrition === 'too little').flatMap(current => current.owners);
const catEatTooMuchOwners = cats.filter(current => current.howNormalNutrition === 'too much').flatMap(current => current.owners);


console.log(`Too little: ${catEatTooLittleOwners} \n Too much: ${catEatTooMuchOwners}`);

// 4. Выведите в консоль строку для каждого из массивов, созданных в пункте 3: 
// "Марина, Алиса, Борис - хозяева кошек, которые едят слишком много!" и "Наташа, Ирина, Алекс  - хозяева кошек, которые едят слишком мало!"
// 5. Выведите в консоль, ест ли хоть одна кошка в точном соответствии с рекомендуемым количеством еды (просто true или false).

console.log(cats.some(current => current.howNormalNutrition === 'recomendation'));

// 6. Выведите в консоль, ест ли хоть одна кошка нормальное количество еды (просто true или false).
console.log(cats.some(current => current.howNormalNutrition === 'normal'));

// 7. Создайте массив, содержащий кошек, которые едят нормальное количество еды (попробуйте повторно использовать условие, используемое в пункте 6).

const catsWhoEatsNormal = cats.some(current => current.howNormalNutrition === 'normal');

// 8. Создайте мелкую (shallow) копию массива cats и отсортируйте по свойству рекомендуемая порция еды по возрастанию (имейте в виду, что порции находятся внутри объектов массива).
const sortedCats = cats.slice().sort((x, y) => x.recomendatedPortion - y.recomendatedPortion);

console.log('sort:', sortedCats);



// console.log(cats);