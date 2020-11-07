import React, {useState, useEffect} from 'react';
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router-dom"

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClink = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyKweets = async () => {
        const kweets = await dbService
            .collection("kweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(kweets.docs.map((doc)=> doc.data()));
    }
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    useEffect(() => {
        getMyKweets();
    },[]);

    return (
        <>
            <form onSubmit={onsubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder={"Display Name"}
                    value={newDisplayName}
                />
                <input type="submit" value={"Update Profile"}/>
            </form>
            <button onClick={onLogOutClink}>Log Out</button>
        </>
    );
};

export default Profile;