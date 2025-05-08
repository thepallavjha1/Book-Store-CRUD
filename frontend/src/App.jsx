import React from 'react';
import Home from './books/home.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/') // Automatically goes to localhost:5000 due to proxy
      .then(res => res.json())
      .then(data => setMessage(data.msg));
  }
  , []);

  return <Home />;
}


export default App;