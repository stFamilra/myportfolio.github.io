import React from "react";
import styles from "./Card.module.scss";

function Card({ onClickFavorite, onClickPlus, src, name, price }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const onPlus = () => {
    // передаю нужные свойства объекта для отображения в корзине
    onClickPlus({ name, price, src });
    setIsAdded(!isAdded);
  };

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
          onClick={onFavorite}
        />
      </div>
      <img width={133} height={112} src={src} alt="Sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className={styles.plus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
          onClick={onPlus}
        />
      </div>
    </div>
  );
}

export default Card;
