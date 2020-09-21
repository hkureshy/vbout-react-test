import React from 'react';

const GrudgeActions = ({ undo, redo }) => {
  return (
    <div className='d-flex justify-content-end my-10'>
      <button className='button mx-5' onClick={undo}>Undo</button>
      <button className='button' onClick={redo}>Redo</button>
    </div>
  );
};

export default GrudgeActions;
