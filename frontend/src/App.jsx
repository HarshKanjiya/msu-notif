import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from './components/pages/HomePage'
import Auth from './components/pages/auth'
import { Provider, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { routineThunk } from './redux/thunk/userThunk'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(routineThunk({}))
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' element={<Auth />} />

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
