import React, {useState, useEffect} from 'react';
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router-dom"

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClink = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
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
        <div className={"container"}>
            <form onSubmit={onsubmit} className={"profileForm"}>
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder={"Display Name"}
                    value={newDisplayName}
                    className={"formInput"}
                />
                <input
                    type="submit"
                    value={"Update Profile"}
                    className={"formBtn"}
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className={"formBtn cancelBtn logOut"} onClick={onLogOutClink}>
                로그아웃
            </span>
        </div>
    );
};

export default Profile;