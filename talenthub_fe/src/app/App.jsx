import { useState } from 'react'
import PlayerList from '../shared/demo/PlayerList';

function App() {
  // Logic
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1);
  }


  // UI
  return (
    <>
    
     <PlayerList />
    </>
  )
}

export default App
