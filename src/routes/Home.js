import React, {useState, useEffect} from 'react';
import {dbService} from "../fbase";
import Kweet from "../components/Kweet";

const Home = ({userObj}) => {

    const [kweet, setKweet] = useState("");
    const [kweets, setKweets] = useState([]);

    useEffect(() => {
        dbService.collection("kweets").onSnapshot(snapshot =>{
            const kweetArray = snapshot.docs.map(doc => (
                {id: doc.id,
                ...doc.data()
                }));
            setKweets(kweetArray);
        })
    },[]);

    const onSubmit = async (e) =>{
        e.preventDefault();
        await dbService.collection("kweets").add({
            text : kweet,
            createdAt : Date.now(),
            creatorId: userObj.uid,
        });
        setKweet("");
    }
    const onChange = (e) => {
        const {
            target : {value},
        } = e;
        setKweet(value);
    }
    console.log(kweets);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={kweet} type="text" placeholder={"What's on your mind?"} maxLength={120} onChange={onChange}/>
                <input type="submit" value={"Kweet"}/>
            </form>
            <div>
                {kweets.map((kweet) => (
                    <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </>
    );
};

export default Home;