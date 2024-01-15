import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AppleLogin from 'react-apple-login';
import axios from 'axios';


const Login3 = () => {
  const [authResponse, setAuthResponse] = useState(null);

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
      if (authResponse && authResponse.email) {
        console.log("auth response: ", authResponse)
        console.log("auth response.email: ", authResponse.email)
        let request = {
            "data": authResponse.email
        }
          consultaEmail(request);
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

  return (
    <AppleLogin
      clientId="loginpudostarkencl"
      redirectURI="https://loginappleprueba.com"
      responseMode="query"
      callback={appleResponse}
      usePopup={true}
    />
  );
};

export default Login3;