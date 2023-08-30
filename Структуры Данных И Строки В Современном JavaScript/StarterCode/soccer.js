const game = {
  team1: 'REAL MADRID',
  team2: 'BARCELONA',
  players: [
    [
      'Courtois',
      'Vazquez',
      'Militao',
      'Nacho',
      'Mendy',
      'Casemiro',
      'Valverde',
      'Modrich',
      'Kroos',
      'Vinicius',
      'Benzema',
    ],
    [
      'Stegen',
      'Mingueza',
      'Araujo',
      'Lenglet',
      'Dest',
      'Busquets',
      'Jong',
      'Alba',
      'Messi',
      'Pedri',
      'Dembele',
    ],
  ],
  score: '2:1',
  scored: ['Kroos', 'Benzema', 'Mingueza'],
  date: 'Apr 10th, 2021',
  odds: {
    team1: 1.48,
    draw: 2.53,
    team2: 4.25,
  },
};

const [players1, players2] = game.players;
const [goalkeeper, ...fieldPlayers] = game.players[0];
const allPlayers = [...game.players[0], ...game.players[1]];
const players1Total = [
  ...players1,
  'Marcelo',
  'Isco',
  'Asensio',
  'Diaz',
  'Odriozola',
];

const { team1, draw, team2 } = { ...game.odds };




// const {odds: {team1, draw, team2}} = game
// console.log(team1, draw, team2);

const printGoals = (...gamePlayers) => {
  for (let i = 0; i < gamePlayers.length; i++) [console.log(gamePlayers[i])];
  console.log(`${gamePlayers.length} goals scored`);
};

// printGoals('Mingueza', 'Messi', 'Modrich', 'Nacho');
printGoals(...game.scored);

const winTeam = team1 < team2 ? game.team1 : game.team2;
console.log(`${winTeam} is more likely to win!`);

for (let key in game) {
  console.log(`${key}:`, game[key]);
}

//part two

//method 1
for (let key of game.scored) {
  console.log(`Goal ${game['scored'].indexOf(key) + 1} - ${key}`);
}

//method 2
for (let [index, val] of game.scored.entries()) {
  console.log(`Goal ${index + 1} - ${val}`);
}

let oddSum = 0;
let odds = Object.values(game.odds);
for (let key in game.odds) {
  oddSum += game.odds[key];
}
let averageOdd = oddSum / odds.length;

console.log(averageOdd);

// for (let key in game.odds) {
//   console.log(`Rate for ${game[key] ?? key} victory: ${game.odds[key]}`);
// }

for (let [index, val] of Object.entries(game.odds)) {
  console.log(
    `Rate for ${index === 'draw' ? index : game[index] + ' victory'}: ${val}`
  );
}

const goalScorers = {};

// game.scored.forEach(function (a) {
//   if (goalScorers[a] !== undefined) {
//     goalScorers[a]++;
//   } else {
//     goalScorers[a] = 1;
//   }
// });

for (let key of game.scored) {
  goalScorers[key] ? goalScorers[key]++ : (goalScorers[key] = 1);
}

console.log(goalScorers);



// lesson 20 task 3

const events = new Map([
  [19, 'Goal'],
  [21, 'Substitution'],
  [43, 'Goal'],
  [56, 'Substitution'],
  [69, 'Yellow card'],
  [73, 'Substitution'],
  [75, 'Yellow card'],
  [79, 'Substitution'],
  [81, 'Red card'],
  [93, 'Goal'],
 ]);
 
 // item 1
 const gameEvents = [...new Set(events.values())];
 console.log(gameEvents);

 // item 2
 events.delete(75);
 console.log(events);

 //item 3
 const getEventsAverageTime = () => console.log(`On average, an event happened every ${90 / events.size} minutes`);
 getEventsAverageTime();

 //item 4

 for (let [key, value] of events){
  console.log(`[${key <= 45 ? 'FIRST' : 'SECOND'} HALF] ${key}: ${value}`);
 }



