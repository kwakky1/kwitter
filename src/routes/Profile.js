import React from 'react';
import {authService} from "../fbase";
import {useHistory} from "react-router-dom"

const Profile = () => {
    const history = useHistory();
    const onLogOutClink = () => {
        authService.signOut();
        history.push("/");
    }

    return (
        <>
            <button onClick={onLogOutClink}>Log Out</button>
        </>
    );
};

export default Profile;