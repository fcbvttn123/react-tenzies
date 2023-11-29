import { useState, useEffect } from 'react'
import './App.css'

import { Die } from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
    
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
    setDice(prev => prev.map(e => {
      return {
        ...e, 
        value: e.isHeld ? e.value : Math.ceil(Math.random() * 6)
      }
    }))
  }

  function holdDice(id) {
    setDice(prev => prev.map(e => {
      return {
        ...e, 
        isHeld: e.id == id ? !e.isHeld : e.isHeld
      }
    }))
  } 

  function resetGame() {
    setTenzies(false)
    setDice(allNewDice())
  }

  useEffect(() => {
    let firstDie = dice[0]
    let differentDie = dice.find(die => {
      if(die.isHeld == false || die.value != firstDie.value) {
        return die
      }
    })
    if(!differentDie){
      setTenzies(prev => !prev)
    }
  }, [dice])

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">
        {dice.map((e) => (
          <Die
            key={e.id}
            id={e.id}
            value={e.value}
            isHeld={e.isHeld}
            holdDice={holdDice}
          />
        ))}
      </div>
      <button onClick={tenzies ? resetGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App
