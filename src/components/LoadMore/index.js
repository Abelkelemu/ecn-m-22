import React from 'react';


const LoadMore = ({onLoadMoreEvt = () => {},}) => {
  return (
    <div className="loadMore">
      <span onClick={() => onLoadMoreEvt()}>
        <i class="fas fa-angle-right"></i>
      </span>
    </div>
    
  );
};

export default LoadMore;