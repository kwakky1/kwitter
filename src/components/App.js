import React, {useState, useEffect} from 'react';
import AppRouter from "components/AppRouter";
import {authService} from "fbase";
import "styles.css"

const App = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
         authService.onAuthStateChanged((user) => {
             if(user) {
                 setUserObj({
                     displayName: user.displayName,
                     uid: user.uid,
                     updateProfile: (args) => user.updateProfile(args),
                 })
             } else {
                 setUserObj(null);
             }
             setInit(true);
         });
    },[]);

    const refreshUser = () => {
        const user = authService.currentUser
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    }

    return (
        <>
            {init ?
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                />
                : "Initializing..."}
          <footer className={"footer"}>&copy; {new Date().getFullYear()} Kwitter</footer>
        </>
    );
}

export default App;
