
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
/* 
export default function App() {

  const [advice, setAdvice] = useState()
  const [count, setCount] = useState(0)

  
  async function getAdvice() {
    const res = await fetch('https://api.adviceslip.com/advice')
    const data = await res.json()
    setAdvice(data.slip.advice)
    setCount(count + 1)
  }
  useEffect(() => 
    {
      getAdvice()
  
    }, [])
  return <div>
    Hello
    <button onClick={getAdvice}>Get Advice</button>
    <p>{advice}</p>
    <Message count={count}></Message>
  </div>
} */

/* function Message(count: any)
{
  return <div>
<h1>You have read {count} hints</h1>
  </div>
} 


  function Advice() {

    const [advice, setAdvice] = useState()
    const [count, setCount] = useState(0)
  
    
    async function getAdvice() {
      const res = await fetch('https://api.adviceslip.com/advice')
      const data = await res.json()
      setAdvice(data.slip.advice)
      setCount(count + 1)
    }
    useEffect(() => 
      {
        getAdvice()
    
      }, [])
    return <div>
      Hello
      <button onClick={getAdvice}>Get Advice</button>
      <p>{advice}</p>
      <Message count={count}></Message>
    </div>
  } */


function App() {

  const [joke, setJoke] = useState<string>('')
  const [timerStarted, setTimer] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showL, setShow] = useState<boolean>(false)

  const getJoke = () => {
    axios.get('https://api.chucknorris.io/jokes/random').then((res) => {
      setJoke(res.data.value)
    })
  }

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])


  useEffect(() => {
    let jokeInterval: NodeJS.Timeout | undefined

    if (timerStarted) {
      jokeInterval = setInterval(() => {
        getJoke()
      }, 3000)
    }


    return () => {
      if (jokeInterval) {
        clearInterval(jokeInterval)
      }
    }
  }, [timerStarted])

  const handleAddFavorite = () => {
    setFavorites(prevFavorites => {

      if (prevFavorites.length >= 10) {
        localStorage.setItem('favorites', JSON.stringify([...prevFavorites.slice(1), joke]))
        return [...prevFavorites.slice(1), joke];
      } else {
        localStorage.setItem('favorites', JSON.stringify([...prevFavorites, joke]))
        return [...prevFavorites, joke];
      }

    });
  };

  const deleteJoke = (i: number) => {
    setFavorites((prev) => {
      localStorage.setItem('favorites', JSON.stringify([...prev.slice(0, i), ...prev.slice(i + 1)]))
      return [...prev.slice(0, i), ...prev.slice(i + 1)]
    })
  }

  return (
    <div className="App">


      <div onClick={handleAddFavorite}> {joke}</div><span>Click joke to add to favorites</span>


      <div>
        <button onClick={() => {
          setTimer(false)
          getJoke()
        }}>more</button>
      </div>
      <div>
        <button onClick={() => {
          if (timerStarted) {
            setTimer(false)
          }
          else setTimer(true)
        }}>3 sec</button>
      </div>
      <div>
        <button onClick={() => { setShow(!showL) }}>favorites</button>
        {showL && <div>{favorites.map((j, ind) => {
          return <li onClick={() => deleteJoke(ind)}>{j}</li>
        })}</div>
        }
      </div>

    </div>

  );
}

export default App;
