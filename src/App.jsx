import { useState } from 'react'
import './App.css'

import { Die } from './components/Die'
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice())
    
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    console.log(id)
  } 

  return (
    <main>
      <div className='die-container'>
        {dice.map(e => <Die key={e.id} id={e.id} value={e.value} isHeld={e.isHeld} holdDice={holdDice}/>)}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
