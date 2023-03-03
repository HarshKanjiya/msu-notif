import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './components/pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/login'  element={<HomePage />} />

        </Routes>


      </BrowserRouter>
    </div>
  )
}

export default App
