import { useState } from 'react'
import './App.css'

import { Die } from './components/Die'

function App() {
  const [dice, setDice] = useState(allNewDice())
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(Math.ceil(Math.random() * 6))
        }
        return newDice
    }

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <main>
      <div className='die-container'>
        {dice.map((e, i) => <Die key={i} value={e}/>)}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
