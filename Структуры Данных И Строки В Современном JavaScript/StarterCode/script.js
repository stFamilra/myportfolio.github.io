// 'use strict';

// const japaneseRestaurant = {
//   name: 'Banzai',
//   location: '108 Markham Woods Rd, Longwood, USA',
//   categories: ['Japanese', 'Sushi', 'Vegetarian', 'Organic'],
//   appetizers: ['Seaweed salad', 'Tempura shrimp', 'Edamame', 'Sushi rice'],
//   mainMenu: ['Sushi', 'Ramen', 'Tempura'],

//   workingHours: {
//     web: {
//       open: 10,
//       close: 23,
//     },
//     fri: {
//       open: 10,
//       close: 23,
//     },
//     sun: {
//       open: 10,
//       close: 23,
//     },
//   },

//   orderFood: function (appetizersIndex, mainMenuIndex) {
//     return [this.appetizers[appetizersIndex], this.mainMenu[mainMenuIndex]];
//   },

//   foodDelivery: function (
//     mainMenuIndex = 0,
//     appetizersIndex = 0,
//     address,
//     deliveryTime = '18:00'
//   ) {
//     console.log(
//       `Your order on the way to you! ${this.appetizers[appetizersIndex]} and ${this.mainMenu[mainMenuIndex]} will be arrived to ${address} at ${deliveryTime}.`
//     );
//   },
// };

// japaneseRestaurant.foodDelivery({
//   deliveryTime: '12:30',
//   address: '18 Markham Woods Rd',
//   mainMenuIndex: 1,
//   appetizersIndex: 0,
// });

// const sum = (...nums) => {
//   let result = 0;
//   for (let i = 0; i < nums.length; i++) {
//     result += nums[i];
//   }

//   console.log(result);
//   return result;
// };

// sum(1, 2, 9999, 438);
// sum(1, 23, 9, 43);
// sum(2, 89, 43);

// /* destructuring objects  */
// const {
//   sun: { open, close },
// } = japaneseRestaurant.workingHours;
// console.log(open, close);

// const { workingHours: hours, name: restName, categories } = japaneseRestaurant;
// console.log(hours, restName, categories);

// const { menu = [], appetizers: starterMenu = 0 } = japaneseRestaurant;
// console.log(menu, starterMenu);

// let x = 3;
// let z = 5;
// console.log(x, z);

// const obj = {
//   x: 11,
//   z: 98,
// };

// ({ x, z } = obj);
// console.log(x, z);

// /* destructuring arrays   */

// const arr = [3, 5, 7];
// const x1 = arr[0];
// const x2 = arr[1];
// const x3 = arr[2];

// const [y1, y2, y3] = arr;

// console.log(x1, x2, x3);
// console.log(y1, y2, y3);

// let [cat1, cat2, cat3] = japaneseRestaurant['categories'];
// console.log(cat1, cat2, cat3);

// [cat1, cat2, cat3] = [cat2, 'hi', cat1];

// console.log(cat1, cat2, cat3);

// const [order1, order2] = japaneseRestaurant.orderFood(0, 2);
// console.log(`order one: ${order1}, order two: ${order2}`);

// const nestedArr = [1, 2, [5, 6]];
// const [n1, n2] = nestedArr[2];
// console.log(nestedArr[2], n1, n2);

// const [f, , [d, e]] = nestedArr;
// console.log(f, d, e);

// /* DEFAUL VALUES */

// const unknownArr = [3, 5];
// const [a1 = 0, a2 = 0, a3 = 0] = unknownArr;
// console.log(a1, a2, a3);

// for (let key in japaneseRestaurant.workingHours) {
//   console.log(key);
// }

// //set
// const orders = new Set(['Sushi', 'Ramen', 'Tempura', 'Sushi']);
// console.log(orders);

// let cc = [0, 1, 5, 4];
// for (let [index, key] of cc.entries()) {
//   // console.log(index + `\n` + key);
//   console.log(`index: ${index} \n key:${key}`);
// }


const capitalizeName = (name) => {
const [mainname, surname] = (name.toLowerCase().split(' '));
const result = mainname[0].toUpperCase() + mainname.split(1) + surname[0].toUpperCase()
console.log(result)
}

capitalizeName('Ar seNiy');

capitalizeName('Roma Shmakov')
