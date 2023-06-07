import { useEffect, useState } from 'react'
import './App.css'

function Countdown(props) { // {time} -> de-structuring syntax
  const [stopwatchTime, setStopWatchTime] = useState(props.time);

  useEffect( // executes twice in dev env to let you know that there's no cleanup function
    () => {
      let intervalID = setInterval(
        () => {
          setStopWatchTime((state) => {return state-1});
        }, 1000)
    
        return () => clearInterval(intervalID); // return the function, don't call the function and return the value
      }, []);

    let whenTimerGoesZero = props.whenTimerGoesZero;
    if(stopwatchTime===0) {
      whenTimerGoesZero(props.id);
    }

  return (
    <div>
      {stopwatchTime}
    </div>
  )
}

function App() {
  const [timers, setTimers] = useState([]); //number of timers

  const [time, setTime] = useState("0"); //seconds given by input field

  const addTimer = 'Add Timer';

  function handleClick() {
    //let noOfTimers = timers.length;
    // let newTimers = x;
    // let currTimers = timers;
    setTimers(function(state) { return [...state, {time:Number(time), id:Symbol()}];});
    setTime("0");
  }

  function whenTimerGoesZero(givenID) {
    setTimers(
      function(state) {
        console.log(givenID, timers);
        return state.filter(function(timer) { timer.id !== givenID})
      }
    )
  }

  return (
    <>
    <input type="text" 
    value={time} 
    onChange={(event) => setTime(event.target.value)} 
    placeholder='seconds'>
    </input>

    <button onClick={handleClick}>{addTimer}</button>
    
    {timers.map((timerObj,  index) => {
      return <Countdown 
              time={timerObj.time}
              key={index}
              id={timerObj.id}
              whenTimerGoesZero={whenTimerGoesZero}
            />
        }
      )
    }

    </>
  )
}

export default App
