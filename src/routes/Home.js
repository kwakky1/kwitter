import React, {useState, useEffect} from 'react';
import {dbService, storageService} from "../fbase";
import Kweet from "../components/Kweet";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {

    const [kweet, setKweet] = useState("");
    const [kweets, setKweets] = useState([]);
    const [image, setImage] = useState("")

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
        let imageUrl = "";
        if(image !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(image, "data_url");
            imageUrl = await response.ref.getDownloadURL()
        }
        const kweetObj = {
            text : kweet,
            createdAt : Date.now(),
            creatorId: userObj.uid,
            imageUrl
        };
        await dbService.collection("kweets").add(kweetObj);
        setKweet("");
        setImage("");
    }
    const onChange = (e) => {
        const {
            target : {value},
        } = e;
        setKweet(value);
    }
    const onFileChange = (e) => {
        const {
            target : {files},
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget : { result }} = finishedEvent;
            setImage(result);
        }
    }
    const onClearPhotoClick = () => {
        setImage(null);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={kweet}
                    type="text"
                    placeholder={"What's on your mind?"}
                    maxLength={120}
                    onChange={onChange}
                />
                <input type="file" accept={"image/*"} onChange={onFileChange}/>
                <input type="submit" value={"Kweet"} />
                {image && (
                    <div>
                    <img src={image} alt="img" width={"50px"} height={"50px"}/>
                    <button onClick={onClearPhotoClick}>취소</button>
                    </div>
                    )}
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