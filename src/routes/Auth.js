import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {authService, firebaseInstance} from "../fbase";
import AuthForm from 'components/AuthForm'

const Auth = () => {
    const onSocialClick = async (e) => {
        const {target : {name},
        } = e;
        let provider
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div className={"authContainer"}>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size={"3x"}
                style={{marginBottom: 30}}
            />
            <AuthForm/>
            <div color={"authBtns"}>
                <button onClick={onSocialClick} name={"google"} className={"authBtn"}>
                    구글 아이디로 로그인 <FontAwesomeIcon icon={faGoogle}/>
                </button>
                <button onClick={onSocialClick} name={"github"} className={"authBtn"}>
                    깃허브 아이디로 로그인 <FontAwesomeIcon icon={faGithub}/>
                </button>
            </div>
        </div>
    );
};

export default Auth;
