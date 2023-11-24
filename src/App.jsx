import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Die } from './components/Die'

function App() {
  const [allNewDice, setAllNewDice] = useState(generateInitialDieArray())

  function generateInitialDieArray() {
    const initialDieArray = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        initialDieArray.push({
          value: randomNumber,
          isGreen: false
        });
    }
    return initialDieArray;
  }

  function dieClicked(dieId) {
    setAllNewDice(prev => prev.map((e, i) => {
      if(i == dieId) {
        return {...e, isGreen: !e.isGreen}
      } else {
        return {...e}
      }
    }))
  }

  return (
    <main>
      <div className='die-container'>
        {allNewDice.map((arrElement, i) => <Die key={i} value={arrElement.value} dieClicked={dieClicked} dieId={i} isGreen={arrElement.isGreen}/>)}
      </div>
    </main>
  )
}

export default App
