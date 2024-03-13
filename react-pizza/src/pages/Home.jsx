import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Card from '../components/Cards';
import Skeleton from '../components/Cards/Skeleton';

function Home({ searchValue, setSearchValue }) {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65c67a6ee5b94dfca2e195bd.mockapi.io/pizzas?sortBy=${sortType.sort}&order=desc${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }`,
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPizzas(data);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => {
            setCategoryId(i);
          }}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter((cur) => cur.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((pizza) => (
                // если название свойства объекта и пропса совпадают, то мы можем передать свойства через деструктуризацию
                <Card key={pizza.id} {...pizza} />
              ))}
      </div>
    </>
  );
}

export default Home;
