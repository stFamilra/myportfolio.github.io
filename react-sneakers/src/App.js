import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

// let sneakerCards = [];
// const getSneakersArray = async function () {
//   try {
//     const response = await fetch(
//       "https://65c67a6ee5b94dfca2e195bd.mockapi.io/items"
//     );
//     const sneakers = await response.json();
//     console.log(sneakers);
//     sneakerCards.push(...sneakers);
//   } catch (err) {
//     console.error(err);
//   }
// };

// getSneakersArray();

function App() {
  // загружаем карточки с кроссовками
  const [items, setItems] = React.useState([]);

  // загружаем карточки в корзину при клике
  const [cartItems, setCartItems] = React.useState([]);

  // открываем корзину
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(
    () =>
      async function () {
        try {
          const response = await fetch(
            "https://65c67a6ee5b94dfca2e195bd.mockapi.io/items"
          );
          const sneakers = await response.json();
          setItems(sneakers);
        } catch (err) {
          console.error(err);
        }
      },
    []
  );

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((card) => (
            <Card
              name={card.name}
              price={card.price}
              src={card.src}
              onClickPlus={(obj) => setCartItems((prev) => [...prev, obj])}
              onClickFavorite={() => console.log("Добавили в закладки")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
