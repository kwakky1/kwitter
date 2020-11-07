import React, {useState} from 'react';
import {dbService, storageService} from "../fbase";

const Kweet = ({ kweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newKweet, setNewKweet] = useState(kweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("이 트윗을 지우길 원하십니까?")
        if(ok){
            await dbService.doc(`kweets/${kweetObj.id}`).delete();
            if(kweetObj.imageUrl !== "") {
                await storageService.refFromURL(kweetObj.imageUrl).delete();
            }
        }
    }

    const toggleEditing = () => {
        setEditing((prev)=> !prev);
        setNewKweet("");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`kweets/${kweetObj.id}`).update({
            text: newKweet
        })
        setEditing(false);
    }

    const onChange = (e) => {
        const {
            target : {value}
        } = e;
        setNewKweet(value);
    }


    return (
        <div>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input type={"text"}
                                       placeholder={"수정하기"}
                                       value={newKweet}
                                       required
                                       onChange={onChange}
                                />
                                <input type="submit" value={"트윗 수정"}/>
                            </form>
                            <button onClick={toggleEditing}>취소</button>
                        </>)
                    }
                </>

            ) : (
                <>
                    <h4>{kweetObj.text}</h4>
                    {kweetObj.imageUrl && <img src={kweetObj.imageUrl} alt="profile" width={"50px"} height={"50px"}/>}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>지우기</button>
                            <button onClick={toggleEditing}>수정하기</button>
                        </>
                    )}
                </>)
            }
        </div>

    );
};

export default Kweet;