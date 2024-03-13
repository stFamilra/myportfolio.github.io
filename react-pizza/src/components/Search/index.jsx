import React from 'react';

import styles from './Search.module.scss';
import svg from '../../assets/img/close.svg';
import search from '../../assets/img/search.svg';

export const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <img src={search} alt="close" width={18} style={{ opacity: 0.5, cursor: 'default' }} />

      <input
        value={searchValue}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Поиск пиццы..."
      />
      {searchValue && <img src={svg} alt="close" width={15} onClick={() => setSearchValue('')} />}
    </div>
  );
};
