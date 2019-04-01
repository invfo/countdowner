import React, { Component, useEffect, useState } from 'react';
import './App.css';

const padWithZeroes = number => {
  if (number <= 9) {
    return "0" + String(number);
  }
  return number;
}

const formatRemainingTime = (millisecondsRemaining) => {
  const days = Math.floor(millisecondsRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (millisecondsRemaining - days * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((millisecondsRemaining - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) / (1000 * 60));
  let seconds = Math.floor((millisecondsRemaining - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);

  hours = padWithZeroes(hours);
  minutes = padWithZeroes(minutes);
  seconds = padWithZeroes(seconds);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

const Countdown = ({eventDate}) => {
  const [millisecondsUntilEvent, setMillisecondsUntilEvent] = useState(
    eventDate - new Date()
  );

  useEffect(() => {
    const countdown = setInterval(
      () => {setMillisecondsUntilEvent(eventDate - new Date())}
      , 1000
    );

    return () => {clearInterval(countdown)}
  });

  const timeRemaining = formatRemainingTime(millisecondsUntilEvent);
  return (
    <div>
      {
        timeRemaining.days !== 0 ?
        (timeRemaining.days + "\xa0jour" + (timeRemaining.days > 1 ? "s" : "") + " ") :
        ""
      }
      {timeRemaining.hours}:
      {timeRemaining.minutes}:
      {timeRemaining.seconds}
    </div>
  )
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>Weekend à la Bourboule</div>
        <Countdown
          eventDate={new Date(2019, 3, 12, 19, 33, 0)}
        />
      </div>
    );
  }
}

export default App;
