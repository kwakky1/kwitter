import React, {useState} from 'react';
import {dbService, storageService} from "../fbase";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const KweetFactory = ( {userObj} ) => {
    const [kweet, setKweet] = useState("");
    const [image, setImage] = useState("")

    const onSubmit = async (e) =>{
        if(kweet === ""){
            return;
        }
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
        setImage("");
    }

    return (
        <form onSubmit={onSubmit} className={"factoryForm"}>
            <div className={"factoryInput__container"}>
                <input
                    className={"factory__Input"}
                    value={kweet}
                    type="text"
                    placeholder={"What's on your mind?"}
                    maxLength={120}
                    onChange={onChange}
                />
                <input type="submit" value={"&rarr;"} className={"factoryInput__arrow"}/>
            </div>
            <label for={"image-file"} className={"factoryInput__label"}>
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input
                id={"image-file"}
                type="file"
                accept={"image/*"}
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {image && (
                <div className={"factoryForm__image"}>
                    <img
                        src={image}
                        alt="img"
                        style={{
                            backgroundImage: image
                        }}
                    />
                    <div className={"factoryForm__clear"} onClick={onClearPhotoClick}>
                        <span>지우기</span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
            )}

        </form>
    );
};

export default KweetFactory;