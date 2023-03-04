import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import HomePage from './components/pages/HomePage'
import Auth from './components/pages/auth'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { routineThunk } from './redux/thunk/userThunk'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.user)


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    dispatch(routineThunk({}))
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/login' element={<Auth />} />

      </Routes>
    </div>
  )
}

export default App
