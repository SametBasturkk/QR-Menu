import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/home.js';
import Profile from './Pages/Profile/profile';
import { Route, Routes } from 'react-router-dom';
import NewMenu from './Pages/NewMenu/NewMenu';
import { useAuth0 } from '@auth0/auth0-react';
import CheckAuth from './Components/security';
import Menu from './Pages/Menu/menu';
import UpdateMenu from './Pages/UpdateMenu/updateMenu';


fetch("http://localhost:3001/api/users", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: localStorage.getItem('userid'),
    userName: localStorage.getItem('username')
  })
}).then((response) => response.json())







function App() {
  return (
    <div className="App">
      <CheckAuth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newmenu" element={<NewMenu />} />
        <Route path="/menu/:menuName" element={<Menu />} />
        <Route path="/updatemenu/:menuName" element={<UpdateMenu />} />
      </Routes>
    </div>
  );
}

export default App;
