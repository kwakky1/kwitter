import React, {useState, useEffect} from 'react';
import AppRouter from "components/AppRouter";
import {authService} from "fbase";

const App = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(() => {
         authService.onAuthStateChanged((user) => {
             if(user) {
                 setIsLoggedIn(true);

             } else {
                 setIsLoggedIn(false)
             }
             setInit(true);
         });
    },[])

    console.log(authService.currentUser);
    /*setInterval(()=>{
        console.log(authService.currentUser);
    },2000)*/
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
          <footer>&copy; {new Date().getFullYear()} Kwitter</footer>
        </>
    );
}

export default App;
