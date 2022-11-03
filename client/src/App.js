import './App.css';
import {Route,Routes } from 'react-router-dom';
import Admin from './component/Admin';
import User from './component/User';
import Home from './component/Home';
import Quiz from './component/Quiz';


function App() {

  return (
    <div className='mainScreen'>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/quiz' element={<Quiz/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
