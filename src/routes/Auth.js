import React, {useState} from 'react';

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onChange = e => {
        e.preventDefault();
        console.log(e.target.name);
    }
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>
            <form>
                <input
                    name={"email"}
                    type="text"
                    placeholder={"Email"}
                    required
                    onChange={onChange}
                    value={email} />
                <input name={"password"} type="password" placeholder={"Password"} required onChange={onChange} value={password} />
                <input type="submit" value={"Log In"}/>
            </form>
            <div>
                <button>구글 아이디로 로그인</button>
                <button>깃허브 아이디로 로그인</button>
            </div>
        </div>
    );
};

export default Auth;
