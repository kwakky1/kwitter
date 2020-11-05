import React, {useState} from 'react';
import AppRouter from "components/AppRouter";
import {authService} from "fbase";

const App = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
    return (
        <>
          <AppRouter isLoggedIn={isLoggedIn}/>
          <footer>&copy; {new Date().getFullYear()} Kwitter</footer>
        </>
    );
}

export default App;
