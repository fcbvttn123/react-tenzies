import { useState, useEffect } from 'react'
import './App.css'

import { Die } from './components/Die'

function App() {
  const [allNewDice, setAllNewDice] = useState(generateInitialDieArray())
  const [btnName, setBtnName] = useState("Roll")
  const greenDice = []

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

  function rollBtnClicked() {
    setAllNewDice(prev => prev.map(e => {
      if(e.isGreen) {
        return {...e}
      } else {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return {...e, value: randomNumber}
      }
    }))
  }

  function checkWinner(greenDice) {
    const num = greenDice[0].value
    greenDice.find(e => e.value != num) || announceWinner()
  }

  function announceWinner() {
    setBtnName("Reset")
  }

  function resetGame() {
    setBtnName("Roll")
    setAllNewDice(generateInitialDieArray())
  }

  useEffect(() => {
    greenDice.length = 0
    allNewDice.forEach(e => e.isGreen && greenDice.push(e))
    greenDice.length == 10 && checkWinner(greenDice)
  }, [allNewDice])

  return (
    <main>
      <div className='die-container'>
        {allNewDice.map((arrElement, i) => <Die key={i} value={arrElement.value} dieClicked={dieClicked} dieId={i} isGreen={arrElement.isGreen}/>)}
      </div>
      <button onClick={btnName == "Roll" ? rollBtnClicked : resetGame}>{btnName}</button>
    </main>
  )
}

export default App
