import React from 'react';
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
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialClick} name={"google"}>구글 아이디로 로그인</button>
                <button onClick={onSocialClick} name={"github"}>깃허브 아이디로 로그인</button>
            </div>
        </div>
    );
};

export default Auth;
