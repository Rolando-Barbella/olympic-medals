import React from 'react';

const Message = ({ text, color='#fff' }) => {
  console.log('Render message')
  return (
    <div className="App App-container">
      <p style={{ color }}>{text}</p>
    </div>
  )
};

export default React.memo(Message);