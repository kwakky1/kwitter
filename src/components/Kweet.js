import React, {useState} from 'react';
import {dbService, storageService} from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className={"kweet"}>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className={"container kweetEdit"}>
                                <input type={"text"}
                                       placeholder={"수정하기"}
                                       value={newKweet}
                                       required
                                       autoFocus
                                       onChange={onChange}
                                       className={"formInput"}
                                />
                                <input type="submit" value={"트윗 수정"} className={"formBtn"}/>
                            </form>

                            <button onClick={toggleEditing} className={"formBtn cancelBtn"}>
                                취소
                            </button>
                        </>)
                    }
                </>

            ) : (
                <>
                    <h4>{kweetObj.text}</h4>
                    {kweetObj.imageUrl && <img src={kweetObj.imageUrl} alt="profile"/>}

                    {isOwner && (
                        <div className={"kweet__actions"}>
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </span>
                        </div>
                    )}
                </>)
            }
        </div>

    );
};

export default Kweet;