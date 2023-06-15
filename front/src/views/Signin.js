import React, { useState } from "react";
import authStyles from '../assets/css/auth.css';
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/auth";

const Signin = () => {
    let history = useHistory();
    const { signin } = useAuth();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    
    const goToSignup = () => {
        history.push("/signup");
    }

    const onSignin = (e) => {
        e.preventDefault();
        signin(email, password)
        .catch(err => alert("Erreur lors de l'authenification"))
    }

    return <>
        <div class="auth_wrapper">
            <div id="formContent">
                <h2 class="active">Se connecter</h2>


                <form onSubmit={onSignin}>
                    <input required type="text" id="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail}/>
                    <input required type="password" id="password" name="login" placeholder="Mot de passe" value={password} onChange={onChangePassword}/>
                    <input type="submit" value="Se connecter" />
                </form>


                {/* <div id="formFooter">
                    <a class="underlineHover" href="#">Forgot Password?</a>
                </div> */}

            </div>
        </div>
    </>
}

export default Signin;