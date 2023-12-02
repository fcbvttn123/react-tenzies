import { useState, useEffect } from 'react'
import './App.css'

import { Die } from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [currentRollNumber, setCurrentRollNumber] = useState(0)
  const [games, setGames] = useState(JSON.parse(localStorage.getItem("tenzies")) || [])
    
  // Create an entire new dice for the new game
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

  // New Roll + Update current Roll Number
  function rollDice() {
    setDice(prev => prev.map(e => {
      return {
        ...e, 
        value: e.isHeld ? e.value : Math.ceil(Math.random() * 6)
      }
    }))
    setCurrentRollNumber(prev => ++prev)
  }

  // Click event for dice --> update green color for die clicked
  function holdDice(id) {
    // If the play wins, disable the click event on all dice 
    if(tenzies) {
      return
    }
    // Update the green color for dice clicked
    setDice(prev => prev.map(e => {
      return {
        ...e, 
        isHeld: e.id == id ? !e.isHeld : e.isHeld
      }
    }))
  } 

  // Click event for "roll" button after wining the game
  function resetGame() {
    setTenzies(false)
    setDice(allNewDice())
  }

  // Check if the game is won or lost, then update "tenzies" state
  useEffect(() => {
    let firstDie = dice[0]
    let differentDie = dice.find(die => {
      if(die.isHeld == false || die.value != firstDie.value) {
        return die
      }
    })
    // If the player wins 
    // --> update "tenzies" state 
    // --> push "roll numbers" to "games" state
    // --> reset "roll numbers" state
    if(!differentDie){
      setTenzies(prev => !prev)
      setGames(prev => [...prev, currentRollNumber])
      setCurrentRollNumber(0)
    }
  }, [dice])
  
  // Save "games" state to local browser 
  useEffect(() => {
    localStorage.setItem("tenzies", JSON.stringify(games))
  }, [games])

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

      <div className='game-history'>
        <h1>Games Played: {games.length}</h1>
        <h1>Roll Numbers per Game: {games.reduce((acc, current) => acc + current, 0) / games.length}</h1>
      </div>
      
    </main>
  );
}

export default App
