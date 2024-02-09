function Drawer({ onCloseCart, items = [] }) {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      onCloseCart();
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      onCloseCart();
    }
  });

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
        </div>
      </div>
    </div>
  );
}

export default Drawer;
