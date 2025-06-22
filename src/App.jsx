import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Calendar from './components/Calendar';
import './App.css'

function App() {

  return (
    <>
      <div className="App">
        <h1>Event Calendar</h1>
        <Calendar />
      </div>
    </>
  )
}

export default App
