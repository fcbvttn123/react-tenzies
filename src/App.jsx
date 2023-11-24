import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Die } from './components/Die'

function App() {
  const [allNewDice, setAllNewDice] = useState(generateRandomNumbers())

  function generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  }

  return (
    <main>
      <div className='die-container'>
        {allNewDice.map((e, i) => <Die key={i} value={e}/>)}
      </div>
    </main>
  )
}

export default App
