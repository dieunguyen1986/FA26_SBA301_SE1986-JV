import { useState } from 'react'
// import PlayerList from '../shared/demo/PlayerList';
import ProductList from '../shared/demo/ProductList';
import Register from '../modules/auths/pages/Register';
import Login from '../modules/auths/pages/Login';

function App() {
  // Logic
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1);
  }

  // UI
  return (
    <>
     <Login />
    </>
  )
}

export default App
