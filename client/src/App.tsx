
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Navbar } from './components/Nabar';
import Login from './pages/Login';
import { Footer } from './components/Footer';

function App() {



  return (
    <div className=' font-secondary'>
    <Router>

      
      <Navbar/>

     
      {/* <Toaster/> */}
      <div className='flex min-h-screen flex-col items-center mt-10'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          

        </Routes>
      </div>

      <Footer/>

   
    </Router>

  </div>
  )
}

export default App
