// import logo from './logo.svg';
import { useState, useEffect, useRef } from "react";
import './App.css';

// const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words"

function App() {
  const [solution, setSolution] = useState("")
  const [guesses, setGuesses] = useState(Array(6).fill(""))
  const [gameEnd, setGameEnd] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    // const fetchWord = async () => {
    //   const response = await fetch(API_URL)
    //   const words = await response.json()
    //   const randomWord = words[Math.floor(Math.random() * words.length)] // Math.random choose random word between 0-1
    //   setSolution(randomWord)
    // }

    // fetchWord()

    setSolution("Super")
  }, [])

  const checkGameEnd = (val) => {
    if (guesses[guesses.length-1] !== "" || gameEnd || solution === val) {
      return true
    }
  }


  const handleInput = () => {
    const inputtedWord = inputRef.current
    let newGuesses = guesses.slice()
    for (let i = 0; i < guesses.length; i++) {
      if (guesses[i] === "") {
        newGuesses[i] = inputtedWord.value
        break
      }
    }
    setGuesses(newGuesses)

    console.log(guesses)
    if (checkGameEnd(inputtedWord.value)) {
      setGameEnd(true)
    }
  }

  return (
    <div>
      <p>Current Status: { gameEnd.toString() }</p>
      {guesses.map((guess, i) => 
        <Line key={i} guess={guess ?? ""} solution={solution}/>
      )}
      <input ref={inputRef} type="text"></input>
      <button onClick={() => handleInput()}>Submit word</button>
    </div>
  );
}

function Line({ guess, solution }) {
  const tiles = []
  
  for(let i = 0; i < 5; i++) {  
    if (guess.length !== 0) {
      const character = guess[i]
      if(character === solution[i]) {
        tiles.push(<div key={i} className="tile green">{character}</div>)
      } else if (solution.includes(character)) {
        tiles.push(<div key={i} className="tile gray">{character}</div>)
      } else {
        tiles.push(<div key={i} className="tile">{character}</div>)
      }
    } else {
      tiles.push(<div key={i} className="tile"></div>)
    }
  }

  return (
    <div className="line">
      { tiles }
    </div>
  )
}

export default App;
