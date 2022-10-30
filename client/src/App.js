import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReactHookFormDemo } from './pages/formPage';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ChartPage } from './pages/chart';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('tifUser'));
 
  const clickHandler = () => {
    localStorage.removeItem('tifUser');
    setUser(null)
    navigate('/login')
  };
  
  useEffect(() => {
    if(user){
      navigate('/')
    }else{
      navigate('/login')
    }
  },[user]);

 
  return (
    <div className="App">
      {user ?
        <Button onClick={clickHandler} label="LoginOut" className='mt-4 p-button-info' />
        :
        <Link to='/login'>
          <Button label="Login" className='mt-4' />
        </Link>}

      <Routes>
        <Route path="/login" element={<ReactHookFormDemo setUser={setUser}/>} />
        <Route path='/' element={<ChartPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
