import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
    let navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [authState, setAuthState] = useState('');

    useEffect(() => {
        // Genera un estado único
        const generateState = () => {
            return [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
        };

        const loadAppleSDK = () => {
            const script = document.createElement('script');
            script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
            script.onload = initializeAppleSignIn;
            document.body.appendChild(script);
        }

        if (!window.AppleID) {
            loadAppleSDK();
        } else {
            initializeAppleSignIn();
        }

        // Configura el estado para la autenticación
        setAuthState(generateState());
    }, []);

    const initializeAppleSignIn = () => {
        window.AppleID.auth.init({
            clientId: 'loginpudostarkencl',
            scope: 'name email',
            redirectURI: 'https://www.jaimeprueba.com:3000/success',
            state: authState,
            usePopup: false // o false si prefieres redireccionar
        });
    };

    const handleSignInWithApple = () => {
        window.AppleID.auth.signIn().then(response => {
            if (response && response.authorization) {
                const email = response.authorization.email; // Obtener el correo electrónico de la respuesta
                setUserEmail(email); // Guardar el correo electrónico en el estado
                // Verifica si el estado coincide
                if (response.state === authState) {
                    navigate('/success', { state: { email } }); // Pasar el correo electrónico como estado en la navegación
                } else {
                    // Manejo de error en caso de que el estado no coincida
                    navigate('/error');
                }
            }
        }).catch(e => {
            navigate('/error');
        });
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='teext'>Sign Up</div>
                <div className="underline">
                    <br />
                </div>
                <div className="signupapple">
                    <button onClick={handleSignInWithApple}>Sign With Apple</button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;