import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
//import AppleLogin from 'react-apple-login';
import icon from '../Assets/icon.PNG'
import './Login3.css'
import axios from 'axios';
//import {useGoogleLogin} from '@react-oauth/google';



const Login3 = () => {
  const [authResponse, setAuthResponse] = useState(null);
  const clientId = "com.pudo.prueba";
const scope = "name email";
const redirectURI = "https://loginappleprueba.com";
const state = "origin:web";

  const navigate = useNavigate();

  const appleResponse = async (response) => {
    console.log("llamando callback");
    if (!response.error) {
      try {
        const res = await axios.post("https://serverapple.onrender.com/auth", response);
        setAuthResponse(res.data);
        console.log("authresponse",authResponse)
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("error, apple response: ", response.error);
    }
  };
 
  useEffect(() => {
    window.AppleID.auth.init({
      clientId,
      scope,
      redirectURI,
      state,
      usePopup: true
    });

    const handleAppleSignInSuccess = (event) => {
      appleResponse(event.detail);
    };

    const handleAppleSignInFailure = (event) => {
      console.log("Error ", event);
    };

    document.addEventListener("AppleIDSignInOnSuccess", handleAppleSignInSuccess);
    document.addEventListener("AppleIDSignInOnFailure", handleAppleSignInFailure);
    return () => {
      document.removeEventListener("AppleIDSignInOnSuccess", handleAppleSignInSuccess);
      document.removeEventListener("AppleIDSignInOnFailure", handleAppleSignInFailure);
    };

    },[]);

    useEffect(() => {
      if (authResponse && authResponse.email) {
      consultaEmail({ data: authResponse.email });
      }
      }, [authResponse]);
    
    const consultaEmail = async (res) => {


      try{
        const consulta = await axios.post("https://serverapple.onrender.com/consultaEmail", res)
        console.log(consulta.data)

        if(consulta.status === 200){
          navigate('/loginExitoso', {state: {email: res.data}});
        }else {
          navigate('/loginFallido');
        }
        
      }catch(error){
        console.error("error en la consulta: ", error);
        navigate('/loginFallido');

      }
    }

    // const login =   useGoogleLogin({
    //   onSuccess: async tokenResponse => {
    //     console.log(tokenResponse)
    //     const res = await axios.post("https://serverapple.onrender.com/auth", tokenResponse.access_token);
    //     console.log(res)
        
        
    //   },
    // });

    const responseMessage = (response) => {
      console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <div className="container">
      <h1>Sign in</h1>
      <img src={icon} alt="jimmy" />
      <div
        id="appleid-signin"
        className="signin-button"
        data-color="black"
        data-border="true"
        data-type="sign-in"
        data-mode="logo-only"
      ></div>
      {/* <AppleLogin
        clientId="loginpudostarkencl"
        redirectURI="https://loginappleprueba.com"
        responseMode="query"
        callback={appleResponse}
        usePopup={true}
        designProp={
         { height: 36,
          width: 200,
          color: 'white'
           }
           
        }
      /> */}

      <div className="login-google">
     {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />  */}
    {/* <button onClick={() => login()}>Sign in with Google 🚀</button> */}
      </div>


    </div>
  );
};

export default Login3;