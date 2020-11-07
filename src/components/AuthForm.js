import React, {useState} from 'react';
import {authService} from "../fbase";

const AuthForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
    const onChange = (e) => {
        e.preventDefault();

        const {
            target: {name, value},
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error)  {
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    return (
        <>
            <form onSubmit={onSubmit} className={"container"}>
                <input
                    name={"email"}
                    type="text"
                    placeholder={"Email"}
                    required
                    onChange={onChange}
                    value={email}
                    className={"authInput"}
                />
                <input name={"password"}
                       type="password"
                       placeholder={"Password"}
                       required
                       onChange={onChange}
                       value={password}
                       className={"authInput"}
                />
                <input type="submit"
                       value={newAccount ? "Create Account":"Log In"}
                       className={"authInput authSubmit"}
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;