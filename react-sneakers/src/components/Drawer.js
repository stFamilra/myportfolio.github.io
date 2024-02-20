import React from "react";
import axios from "axios";
function Drawer({ onCloseCart, onRemove, items = [] }) {
  // items = axios.get("https://65c67a6ee5b94dfca2e195bd.mockapi.io/cart");
  // Удаление карточки из корзины
  // const [cardRemoved, addCardRemoved] = React.useState([]);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      onCloseCart();
    }
  });
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("overlay") ||
      e.target.classList.contains("greenButton")
    ) {
      onCloseCart();
    }
  });

  // const curItems = items.filter((cur) => {
  //   // document.querySelector(".removeBtn").addEventListener("click", (e) => {
  //   //   addCardRemoved([...cardRemoved, cur]);
  //   // console.log(cur);
  //   // });
  //   return !cardRemoved.includes(cur);
  // });
  const itemsReduced = items.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={onCloseCart}
          />
        </h2>
        {items.length > 0 ? (
          <div>
            {" "}
            <div className="items">
              {items.map((item) => {
                return (
                  <div className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${item.src})` }}
                      className="cartItemImg"
                    ></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                      onClick={(e) => {
                        onRemove(item.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{itemsReduced} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{((itemsReduced / 100) * 5).toFixed(2)} руб. </b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>{" "}
          </div>
        ) : (
          <div className="cartEmpty">
            <img
              src="/img/cart-empty.svg"
              alt="empty"
              className="mb-20"
              width={120}
              height={120}
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы пару кроссовок, чтобы сделать заказ!
            </p>
            <button className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
