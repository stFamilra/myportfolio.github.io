import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="430" rx="10" ry="10" width="95" height="30" />
    <circle cx="134" cy="124" r="124" />
    <rect x="120" y="420" rx="25" ry="25" width="153" height="45" />
    <rect x="218" y="481" rx="0" ry="0" width="2" height="1" />
  </ContentLoader>
);

export default Skeleton;
