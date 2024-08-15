
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Navbar } from './components/Nabar';

function App() {


  return (
    <div className=' font-secondary'>
    <Router>

      
      <Navbar/>

     
      {/* <Toaster/> */}
      <div className='flex min-h-screen flex-col items-center mt-10'>
        <Routes>
          <Route path="/" element={<Home/>} />
          

        </Routes>
      </div>

   
    </Router>

  </div>
  )
}

export default App
