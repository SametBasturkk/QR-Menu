import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
  const { logout } = useAuth0();
  return (
    <Button variant="primary" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

const LoginLogoutButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {isAuthenticated ? <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button> : <button onClick={() => loginWithRedirect()}>Log In</button>}
    </>
  );


};


const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Wikipedia-logo-white.svg/2560px-Wikipedia-logo-white.svg.png"
              width="200"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <LoginLogoutButton />

        </Container>
      </Navbar>
    </>
  );
};





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-yi0xe0cx.us.auth0.com"
    clientId="xDjk7eRhKx4ghNt1p06JWAcbBIoOBFUB"
    redirectUri="http://localhost:3000/profile"
  >

    <BrowserRouter>
      <NavBar />
      <App />
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
