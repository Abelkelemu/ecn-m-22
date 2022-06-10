import React from 'react';
import Button from './../forms/Button';
import './styles.scss'

const LoadMore = ({
  onLoadMoreEvt = () => {},
}) => {
  return (
    <div className="loadMore">
      
      <span onClick={() => onLoadMoreEvt()}>
        <i class="fas fa-angle-right"></i>
      </span>
    </div>
    
  );
};

export default LoadMore;