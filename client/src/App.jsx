import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouter } from './Components/ProtectedRouter';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Casar from './Pages/Casar';
import Registrar from './Pages/Registrar';
import RegistrarUser from './Pages/RegistrarUser';
import Navbar from './Components/Navbar';

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login setUser={setUser}/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/dashboard' element={
          <ProtectedRouter user={user}>
            <Dashboard user={user} setUser={setUser}/>
          </ProtectedRouter>
        }/>
        <Route path='/navbar' element={
          <ProtectedRouter user={user}>
            <Navbar user={user} setUser={setUser}/>
          </ProtectedRouter>
        }/>
        <Route path='/casar' element={
          <ProtectedRouter user={user}>
            <Casar user={user} setUser={setUser}/>
          </ProtectedRouter>
        }/>
        <Route path='/registrar' element={
          <ProtectedRouter user={user}>
            <Registrar user={user} setUser={setUser}/>
          </ProtectedRouter>
        }/>
        <Route path='/registrar_usuario' element={
          <ProtectedRouter user={user} alloweRoles={['ADMIN']}>
            <RegistrarUser user={user} setUser={setUser} />
          </ProtectedRouter>
        } />
        <Route path='*' element={<div><h1>Page Not Foud</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
