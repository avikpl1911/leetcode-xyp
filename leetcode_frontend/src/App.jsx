import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter , Routes , Route} from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:slug" element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
