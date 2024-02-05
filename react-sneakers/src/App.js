import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const sneakerCards = [
  {
    name: "Мужские Кроссовки Under Armour Curry 8",
    price: 12999,
    src: "/img/sneakers/1.jpg",
  },
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    src: "/img/sneakers/2.jpg",
  },
  {
    name: "Мужские Кроссовки Nike Lebron XVIII Low",
    price: 13999,
    src: "/img/sneakers/3.jpg",
  },
  {
    name: "Мужские Кроссовки Nike Kyrie 7",
    price: 11299,
    src: "/img/sneakers/4.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {sneakerCards.map((card) => (
            <Card
              name={card.name}
              price={card.price}
              src={card.src}
              onClickPlus={() => console.log(5)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
