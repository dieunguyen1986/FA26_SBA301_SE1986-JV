import { useState } from 'react'
// import PlayerList from '../shared/demo/PlayerList';
import ProductList from '../shared/demo/ProductList';

function App() {
  // Logic
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1);
  }

  // UI
  return (
    <>
     <ProductList />
    </>
  )
}

export default App
