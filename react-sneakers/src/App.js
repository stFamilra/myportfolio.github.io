import React from "react";
import axios from "axios";
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
  // загрузка карточки с кроссовками
  const [items, setItems] = React.useState([]);

  // загрузка карточки в корзину при клике
  const [cartItems, setCartItems] = React.useState([]);

  // открытие корзины
  const [cartOpened, setCartOpened] = React.useState(false);

  // поиск карточки
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://65c67a6ee5b94dfca2e195bd.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://65c67a6ee5b94dfca2e195bd.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
  }, []);

  const onAddToCart = async (obj) => {
    axios.post("https://65c67a6ee5b94dfca2e195bd.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };
  const onRemoveItem = (id) => {
    axios
      .delete(`https://65c67a6ee5b94dfca2e195bd.mockapi.io/cart/${id}`)
      .then((r) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error(err));
    // console.log(id);
    // setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex justify-between">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={() => setSearchValue("")}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((card, i) => (
              <Card
                key={i}
                // id={card.id}
                // name={card.name}
                // price={card.price}
                // src={card.src}
                onClickPlus={onAddToCart}
                onClickFavorite={() => console.log("Добавили в закладки")}
                {...card}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
